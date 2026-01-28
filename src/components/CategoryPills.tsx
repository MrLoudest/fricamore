import Link from "next/link"

export type CategoryPill = {
  id: string
  slug: string
  name: string
}

type CategoryPillsProps = {
  categories: CategoryPill[]
  activeSlug?: string
}

export default function CategoryPills({
  categories,
  activeSlug,
}: CategoryPillsProps) {
  const baseClass =
    "inline-flex items-center rounded-full border px-3 py-1 text-sm"

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/store"
        className={`${baseClass} ${
          !activeSlug ? "border-black text-black" : "border-gray-200 text-gray-700"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`${baseClass} ${
            activeSlug === category.slug
              ? "border-black text-black"
              : "border-gray-200 text-gray-700"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
