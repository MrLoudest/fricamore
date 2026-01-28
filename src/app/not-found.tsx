import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-4 px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">404</p>
      <h1 className="text-3xl font-medium text-neutral-900">
        We could not find that page.
      </h1>
      <p className="text-sm text-neutral-600">
        The page you tried to access does not exist.
      </p>
      <Link className="text-sm text-neutral-700 underline" href="/store">
        Return to the shop
      </Link>
    </div>
  )
}
