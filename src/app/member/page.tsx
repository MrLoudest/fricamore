import Link from "next/link"

export default function MemberPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
        Member
      </p>
      <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
        A quieter way to shop.
      </h1>
      <p className="text-sm text-neutral-600">
        Membership is a calm space for early access, thoughtful notes, and small
        rituals. Authentication will be added soon.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/login"
          className="rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm text-white"
        >
          Log in
        </Link>
        <button
          type="button"
          className="rounded-full border border-neutral-300 px-6 py-3 text-sm text-neutral-700"
        >
          Request access
        </button>
      </div>
    </div>
  )
}
