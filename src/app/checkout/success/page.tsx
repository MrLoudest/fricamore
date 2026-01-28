import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
        Success
      </p>
      <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
        Order confirmed.
      </h1>
      <p className="text-sm text-neutral-600">
        This is a temporary confirmation screen. Payment will be added soon.
      </p>
      <Link
        href="/store"
        className="w-fit rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm text-white"
      >
        Return to store
      </Link>
    </div>
  )
}
