import { products } from "../../data/products"

type CheckoutPayload = {
  customer: {
    email: string
    fullName: string
    addressLine: string
    city: string
    postalCode: string
    country: string
  }
  items: {
    slug: string
    quantity: number
  }[]
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return Response.json(
      { error: "Stripe secret key is missing." },
      { status: 500 }
    )
  }

  let payload: CheckoutPayload
  try {
    payload = (await request.json()) as CheckoutPayload
  } catch {
    return Response.json({ error: "Invalid payload." }, { status: 400 })
  }

  if (!payload?.customer?.email || !Array.isArray(payload.items)) {
    return Response.json({ error: "Invalid payload." }, { status: 400 })
  }

  if (payload.items.length === 0) {
    return Response.json({ error: "Cart is empty." }, { status: 400 })
  }

  const lineItems = payload.items.map((item) => {
    const product = products.find((entry) => entry.slug === item.slug)
    if (!product) {
      return null
    }

    if (!Number.isFinite(item.quantity) || item.quantity <= 0 || item.quantity > 10) {
      return null
    }

    const unitAmount = Math.round(product.price * 100)
    if (unitAmount <= 0) {
      return null
    }

    return {
      name: product.name,
      quantity: item.quantity,
      unitAmount,
    }
  })

  if (lineItems.some((item) => item === null)) {
    return Response.json({ error: "Invalid cart items." }, { status: 400 })
  }

  const origin = new URL(request.url).origin
  const params = new URLSearchParams()
  params.append("mode", "payment")
  params.append("success_url", `${origin}/checkout/success`)
  params.append("cancel_url", `${origin}/checkout/cancel`)
  params.append("customer_email", payload.customer.email)
  params.append("payment_method_types[0]", "card")

  lineItems.forEach((item, index) => {
    params.append(`line_items[${index}][price_data][currency]`, "usd")
    params.append(
      `line_items[${index}][price_data][product_data][name]`,
      item.name
    )
    params.append(
      `line_items[${index}][price_data][unit_amount]`,
      item.unitAmount.toString()
    )
    params.append(`line_items[${index}][quantity]`, item.quantity.toString())
  })

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })

  const data = (await response.json()) as { url?: string; error?: unknown }

  if (!response.ok || !data.url) {
    return Response.json(
      { error: "Unable to create Stripe session." },
      { status: 500 }
    )
  }

  return Response.json({ url: data.url })
}
