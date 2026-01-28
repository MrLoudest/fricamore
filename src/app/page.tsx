import Link from "next/link"

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            FRICA / 2026
          </p>
          <h1 className="text-4xl font-medium leading-tight text-neutral-900 md:text-5xl">
            Quiet luxury for everyday rituals.
          </h1>
          <p className="text-base text-neutral-600">
            A minimal, editorial selection of essentials designed to bring calm,
            balance, and refinement to the spaces you inhabit.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store"
              className="rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm text-white"
            >
              Shop now
            </Link>
            <Link
              href="/member"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm text-neutral-700"
            >
              Become a member
            </Link>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
            alt="Minimal product still life"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-8 border-t border-neutral-200 pt-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Philosophy
          </p>
          <p className="text-sm text-neutral-600">
            We design for quiet moments and confident spaces. Nothing loud,
            nothing rushed.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Material
          </p>
          <p className="text-sm text-neutral-600">
            A restrained palette, soft textures, and a focus on what lasts.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Ritual
          </p>
          <p className="text-sm text-neutral-600">
            A collection shaped for repeat use, daily calm, and thoughtful care.
          </p>
        </div>
      </section>
    </div>
  )
}
