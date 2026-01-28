import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

type StripeLineItem = {
  description: string | null
  quantity: number | null
  amount_total: number | null
  price: {
    unit_amount: number | null
    currency: string | null
  } | null
}

type StripeLineItemsResponse = {
  data: StripeLineItem[]
}

type StripeSession = {
  id: string
  amount_total: number | null
  currency: string | null
  customer_email: string | null
  customer_details: {
    email: string | null
    name: string | null
  } | null
  shipping_details: {
    name: string | null
    address: {
      line1: string | null
      city: string | null
      postal_code: string | null
      country: string | null
    } | null
  } | null
}

type StripeEvent = {
  type: string
  data: {
    object: StripeSession
  }
}

export const runtime = "nodejs"

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!stripeSecret || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    return new Response("Server misconfigured", { status: 500 })
  }

  const payload = await request.text()
  const signatureHeader = request.headers.get("stripe-signature")

  let event: StripeEvent
  try {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2024-06-20",
    })
    event = stripe.webhooks.constructEvent(
      payload,
      signatureHeader ?? "",
      webhookSecret
    ) as StripeEvent
  } catch {
    return Response.json({ error: "Invalid payload." }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true })
  }

  const session = event.data.object
  const sessionId = session.id
  if (!sessionId) {
    return Response.json({ error: "Missing session id." }, { status: 400 })
  }

  const email =
    session.customer_details?.email ??
    session.customer_email ??
    ""
  if (!email) {
    return Response.json({ error: "Missing customer email." }, { status: 400 })
  }

  const lineItemsResponse = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
      },
    }
  )

  if (!lineItemsResponse.ok) {
    return Response.json(
      { error: "Unable to fetch Stripe line items." },
      { status: 500 }
    )
  }

  const lineItemsData =
    (await lineItemsResponse.json()) as StripeLineItemsResponse

  if (!Array.isArray(lineItemsData.data) || lineItemsData.data.length === 0) {
    return Response.json({ error: "Missing line items." }, { status: 400 })
  }

  const items = lineItemsData.data.map((item) => ({
    name: item.description ?? "Item",
    quantity: item.quantity ?? 0,
    unit_amount: item.price?.unit_amount ?? 0,
    amount_total: item.amount_total ?? 0,
  }))

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unit_amount * item.quantity,
    0
  )

  const order = {
    email,
    full_name:
      session.shipping_details?.name ??
      session.customer_details?.name ??
      "",
    address_line: session.shipping_details?.address?.line1 ?? "",
    city: session.shipping_details?.address?.city ?? "",
    postal_code: session.shipping_details?.address?.postal_code ?? "",
    country: session.shipping_details?.address?.country ?? "",
    items,
    total_amount: session.amount_total ?? totalAmount,
    currency: session.currency ?? "usd",
    stripe_session_id: sessionId,
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  })

  const { error } = await supabaseAdmin
    .from("orders")
    .upsert(order, { onConflict: "stripe_session_id", ignoreDuplicates: true })

  if (error) {
    return Response.json({ error: "Order insert failed." }, { status: 500 })
  }

  return Response.json({ received: true })
}
