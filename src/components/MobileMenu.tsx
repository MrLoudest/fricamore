"use client"

import Link from "next/link"

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export default function MobileMenu(props: MobileMenuProps) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-neutral-200 bg-white px-6 py-6 transition-transform duration-300 ${
        props.open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
      aria-hidden={!props.open}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-[0.2em]">MENU</p>
        <button
          type="button"
          onClick={props.onClose}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          Close
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-6 text-base text-neutral-700">
        <Link href="/store" onClick={props.onClose}>
          Shop
        </Link>
        <Link href="/about" onClick={props.onClose}>
          About
        </Link>
        <Link href="/member" onClick={props.onClose}>
          Member
        </Link>
        <Link href="/login" onClick={props.onClose}>
          Log in
        </Link>
      </nav>
    </aside>
  )
}
