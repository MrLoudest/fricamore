"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"

type Family = { id: string; value: string }

export default function FamilyMenu({ families }: { families: Family[] }) {
  const params = useSearchParams()
  const pathname = usePathname()
  const selected = params.get("family") || ""

  // extract country code from the current URL
  // e.g. pathname = "/se/store" → countryCode = "se"
  const segments = pathname.split("/").filter(Boolean)
  const countryCode = segments[0]     // first segment

  const pretty = (value: string) => {
    const map: Record<string, string> = {
      citrus: "Fresh",
      floral: "Floral",
      woody: "Woody",
      gourmand: "Gourmand",
      fougere: "Fougère",
      oriental: "Oriental",
    }
    return map[value] || value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">

      {/* All Families → go to correct store root */}
      <Link
        href={`/${countryCode}/store`}
        className={`rounded-full border px-3 py-1 text-sm ${
          !selected ? "bg-black text-white" : "bg-white"
        }`}
        prefetch={false}
      >
        All Families
      </Link>

      {families.map((f) => (
        <Link
          key={f.id}
          href={`/${countryCode}/store?family=${f.id}&page=1`}
          className={`rounded-full border px-3 py-1 text-sm capitalize ${
            selected === f.id ? "bg-black text-white" : "bg-white"
          }`}
          prefetch={false}
        >
          {pretty(f.value)}
        </Link>
      ))}
    </div>
  )
}
