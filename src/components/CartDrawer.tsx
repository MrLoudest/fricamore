"use client"

import { useRouter } from "next/navigation"
import Price from "./Price"

type CartLine = {
  slug: string
  name: string
  price: number
  quantity: number
  image: string
}

type CartDrawerProps = {
  open: boolean
  items: CartLine[]
  subtotal: number
  onClose: () => void
  onRemove: (slug: string) => void
  onUpdateQuantity: (slug: string, quantity: number) => void
  onCheckout: () => void
}

export default function CartDrawer(props: CartDrawerProps) {
  const router = useRouter()
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl transition-transform duration-300 ${
        props.open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
      aria-hidden={!props.open}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
        <p className="text-sm font-semibold tracking-[0.2em]">CART</p>
        <button
          type="button"
          onClick={props.onClose}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          Close
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        {props.items.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Your cart is quiet for now.
          </p>
        ) : (
          props.items.map((item) => (
            <div key={item.slug} className="flex gap-4">
              <div className="h-20 w-16 overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-neutral-500">
                      <Price amount={item.price} />
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => props.onRemove(item.slug)}
                    className="text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <button
                    type="button"
                    onClick={() =>
                      props.onUpdateQuantity(item.slug, item.quantity - 1)
                    }
                    className="h-7 w-7 rounded-full border border-neutral-300 text-sm"
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      props.onUpdateQuantity(item.slug, item.quantity + 1)
                    }
                    className="h-7 w-7 rounded-full border border-neutral-300 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-neutral-200 px-6 py-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium">
            <Price amount={props.subtotal} />
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            props.onClose()
            router.push("/checkout")
          }}
          disabled={props.items.length === 0}
          className="mt-4 w-full rounded-full border border-neutral-900 bg-neutral-900 py-3 text-sm text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300"
        >
          Checkout
        </button>
      </div>
    </aside>
  )
}
