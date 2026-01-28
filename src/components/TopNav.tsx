"use client"

import Link from "next/link"

type TopNavProps = {
  cartCount: number
  onCartToggle: () => void
  onMenuToggle: () => void
}

export default function TopNav(props: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-[0.24em]">
          FRICA
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          <Link href="/store" className="hover:text-neutral-900">
            Shop
          </Link>
          <Link href="/about" className="hover:text-neutral-900">
            About
          </Link>
          <Link
            href="/member"
            className="hover:text-neutral-900"
          >
            Member
          </Link>
          <button
            type="button"
            onClick={props.onCartToggle}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <span className="sr-only">Cart</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
              <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H7" />
            </svg>
            <span className="text-xs text-neutral-400">({props.cartCount})</span>
          </button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={props.onCartToggle}
            className="text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="Open cart"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
              <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={props.onMenuToggle}
            className="text-sm text-neutral-600 hover:text-neutral-900"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
