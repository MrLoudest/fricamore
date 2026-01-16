import { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import { ChevronLeft } from "@medusajs/icons"

import { listCategories } from "@lib/data/categories"
import FamilyMenu from "@modules/store/components/family-menu"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"

import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()

  const h = await headers()
  const pathname = h.get("x-invoke-path") || ""

  // Fetch Medusa categories for top menu
  const categories = await listCategories()

  const families = categories.map((c) => ({
    id: c.handle,
    value: c.name,
  }))

  let shippingOptions: StoreCartShippingOption[] = []
  if (cart) {
    const { shipping_options } = await listCartOptions()
    shippingOptions = shipping_options
  }

  // Pages where we show the category bar
  const showCategoryMenu =
    pathname.startsWith("/store") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/categories")

  const showBackArrow = showCategoryMenu

  return (
    <>
      <Nav />

      {showBackArrow && (
        <div className="content-container mt-4 mb-4">
          <Link
            href="/store"
            className="flex items-center gap-2 text-sm text-ui-fg-subtle hover:text-ui-fg-base"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>
      )}

      {showCategoryMenu && families.length > 0 && (
        <div className="content-container mb-6">
          <FamilyMenu families={families} />
        </div>
      )}

      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}

      {children}

      <Footer />
    </>
  )
}
