import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <p className="text-sm font-semibold tracking-[0.22em]">FRICA</p>
          <p className="text-sm text-neutral-600">
            A calm, editorial collection of modern essentials designed for
            quiet, intentional rituals.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-8 text-sm text-neutral-600 md:w-auto md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Navigate
            </p>
            <Link href="/store" className="block hover:text-neutral-900">
              Shop
            </Link>
            <Link href="/about" className="block hover:text-neutral-900">
              About
            </Link>
            <Link href="/member" className="block hover:text-neutral-900">
              Member
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Social
            </p>
            <span className="block">Instagram</span>
            <span className="block">Pinterest</span>
            <span className="block">Journal</span>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Legal
            </p>
            <span className="block">Privacy</span>
            <span className="block">Terms</span>
            <span className="block">Returns</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
