"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

type AddToCartButtonProps = {
  slug: string
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleAdd = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("add", props.slug)
    const nextUrl = `${pathname}?${params.toString()}`
    router.replace(nextUrl, { scroll: false })
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full rounded-full border border-neutral-900 bg-neutral-900 py-3 text-sm text-white hover:bg-neutral-800"
    >
      Add to cart
    </button>
  )
}
