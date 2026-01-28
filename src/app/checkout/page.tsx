"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Price from "../../components/Price"
import type { CartLineItem } from "../../components/AppShell"

type CheckoutFormState = {
  email: string
  fullName: string
  addressLine: string
  city: string
  postalCode: string
  country: string
}

type CheckoutPageProps = {
  cartItems?: CartLineItem[]
  subtotal?: number
}

const initialFormState: CheckoutFormState = {
  email: "",
  fullName: "",
  addressLine: "",
  city: "",
  postalCode: "",
  country: "",
}

function CheckoutPage(props: CheckoutPageProps) {
  const router = useRouter()
  const [formState, setFormState] = useState<CheckoutFormState>(initialFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cartItems = useMemo<CartLineItem[]>(
    () => props.cartItems ?? [],
    [props.cartItems]
  )
  const subtotal =
    props.subtotal ??
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace("/store")
    }
  }, [cartItems.length, router])

  if (cartItems.length === 0) {
    return null
  }

  const handleChange =
    (field: keyof CheckoutFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

  const validate = () => {
    const nextErrors: Record<string, string> = {}
    if (!formState.email.trim()) nextErrors.email = "Email is required."
    if (!formState.fullName.trim()) nextErrors.fullName = "Full name is required."
    if (!formState.addressLine.trim())
      nextErrors.addressLine = "Address line is required."
    if (!formState.city.trim()) nextErrors.city = "City is required."
    if (!formState.postalCode.trim())
      nextErrors.postalCode = "Postal code is required."
    if (!formState.country.trim()) nextErrors.country = "Country is required."
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    void handleCheckout(event)
  }

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    if (!validate()) {
      return
    }

    const payload = {
      customer: formState,
      items: cartItems.map((item) => ({
        slug: item.slug,
        quantity: item.quantity,
      })),
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Unable to start checkout.")
      }

      const data = (await response.json()) as { url?: string }
      if (!data.url) {
        throw new Error("Checkout URL missing.")
      }

      window.location.assign(data.url)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong."
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          Checkout
        </p>
        <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
          Complete your order.
        </h1>
        <p className="text-sm text-neutral-600">
          This is a calm, temporary checkout flow. Payment will be added soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-[0.2em]">
              Customer information
            </h2>
            <p className="text-sm text-neutral-500">
              Details for your receipt and delivery updates.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={handleChange("email")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-rose-500">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Full name
              </label>
              <input
                type="text"
                value={formState.fullName}
                onChange={handleChange("fullName")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="Full name"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500">{errors.fullName}</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-[0.2em]">
              Shipping address
            </h2>
            <p className="text-sm text-neutral-500">
              Where we should deliver your order.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Address line
              </label>
              <input
                type="text"
                value={formState.addressLine}
                onChange={handleChange("addressLine")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="Street address"
              />
              {errors.addressLine && (
                <p className="text-xs text-rose-500">{errors.addressLine}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                City
              </label>
              <input
                type="text"
                value={formState.city}
                onChange={handleChange("city")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-xs text-rose-500">{errors.city}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Postal code
              </label>
              <input
                type="text"
                value={formState.postalCode}
                onChange={handleChange("postalCode")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="Postal code"
              />
              {errors.postalCode && (
                <p className="text-xs text-rose-500">{errors.postalCode}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Country
              </label>
              <input
                type="text"
                value={formState.country}
                onChange={handleChange("country")}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-400 focus:outline-none"
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-xs text-rose-500">{errors.country}</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-[0.2em]">
              Order summary
            </h2>
            <p className="text-sm text-neutral-500">
              Review your items before continuing.
            </p>
          </div>
          <div className="space-y-4 text-sm text-neutral-700">
            {cartItems.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-neutral-500">
                    Qty {item.quantity}
                  </p>
                </div>
                <Price amount={item.price * item.quantity} />
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <Price amount={subtotal} />
            </div>
            <div className="flex items-center justify-between font-medium text-neutral-900">
              <span>Total</span>
              <Price amount={subtotal} />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full border border-neutral-900 bg-neutral-900 py-3 text-sm text-white hover:bg-neutral-800"
        >
          {isSubmitting ? "Redirecting..." : "Continue to payment"}
        </button>
        {submitError && (
          <p className="text-sm text-rose-500">{submitError}</p>
        )}
      </form>
    </div>
  )
}

(CheckoutPage as any).isCheckoutPage = true

export default CheckoutPage
