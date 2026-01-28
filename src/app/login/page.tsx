export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
        Log in
      </p>
      <h1 className="text-3xl font-medium text-neutral-900">Welcome back.</h1>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
        Authentication will be enabled soon. This placeholder keeps the flow
        consistent while the storefront evolves.
      </div>
    </div>
  )
}
