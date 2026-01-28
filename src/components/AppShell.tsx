"use client"

import { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { products } from "../app/data/products"
import CartDrawer from "./CartDrawer"
import Footer from "./Footer"
import MobileMenu from "./MobileMenu"
import TopNav from "./TopNav"

type OverlayMode = "cart" | "menu" | null

type CartItem = {
  slug: string
  quantity: number
}

export type CartLineItem = {
  slug: string
  quantity: number
  name: string
  price: number
  image: string
}

export default function AppShell(props: { children: React.ReactNode }) {
  const [overlayMode, setOverlayMode] = useState<OverlayMode>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const cartLines = useMemo<CartLineItem[]>(() => {
    return cartItems
      .map((item) => {
        const product = products.find((entry) => entry.slug === item.slug)
        if (!product) {
          return null
        }
        return {
          slug: item.slug,
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          image: product.image,
        }
      })
      .filter((line): line is NonNullable<typeof line> => Boolean(line))
  }, [cartItems])

  const cartCount = cartLines.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartLines.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  useEffect(() => {
    const addSlug = searchParams.get("add")
    if (!addSlug) {
      return
    }

    const productExists = products.some((entry) => entry.slug === addSlug)

    setCartItems((prev) => {
      if (!productExists) {
        return prev
      }
      const existing = prev.find((item) => item.slug === addSlug)
      if (existing) {
        return prev.map((item) =>
          item.slug === addSlug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { slug: addSlug, quantity: 1 }]
    })
    if (productExists) {
      setOverlayMode("cart")
    }

    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.delete("add")
    const nextUrl = updatedParams.toString()
      ? `${pathname}?${updatedParams.toString()}`
      : pathname
    router.replace(nextUrl, { scroll: false })
  }, [pathname, router, searchParams])

  useEffect(() => {
    setOverlayMode(null)
  }, [pathname])

  const handleCloseOverlay = () => setOverlayMode(null)

  const handleToggleCart = () =>
    setOverlayMode((prev) => (prev === "cart" ? null : "cart"))

  const handleToggleMenu = () =>
    setOverlayMode((prev) => (prev === "menu" ? null : "menu"))

  const handleRemoveItem = (slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug))
  }

  const handleUpdateQuantity = (slug: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      handleRemoveItem(slug)
      return
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, quantity: nextQuantity } : item
      )
    )
  }

  const isOverlayOpen = overlayMode !== null

  const handleCheckout = () => {
    if (cartLines.length === 0) {
      return
    }
    setOverlayMode(null)
    router.push("/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav
        cartCount={cartCount}
        onCartToggle={handleToggleCart}
        onMenuToggle={handleToggleMenu}
      />

      <main className="flex-1">
        {Children.map(props.children, (child) => {
          if (!isValidElement(child)) {
            return child
          }

          const isCheckoutPage = Boolean((child.type as any)?.isCheckoutPage)
          if (!isCheckoutPage) {
            return child
          }

          return cloneElement(child as React.ReactElement<any>, {
            cartItems: cartLines,
            subtotal,
          })
        })}
      </main>

      <Footer />

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm ${
          isOverlayOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOverlayOpen}
        onClick={handleCloseOverlay}
      />

      <CartDrawer
        items={cartLines}
        open={overlayMode === "cart"}
        onClose={handleCloseOverlay}
        onRemove={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        subtotal={subtotal}
        onCheckout={handleCheckout}
      />

      <MobileMenu open={overlayMode === "menu"} onClose={handleCloseOverlay} />
    </div>
  )
}
