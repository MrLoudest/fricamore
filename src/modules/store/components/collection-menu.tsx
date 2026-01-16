"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"
import type { HttpTypes } from "@medusajs/types"

type Collection = HttpTypes.StoreCollection

export default function CollectionMenu({ collections }: { collections: Collection[] }) {
	const params = useSearchParams()
	const pathname = usePathname()
	const selected = params.get("collection") || ""

	const buildHref = (id?: string) => {
		const sp = new URLSearchParams(params.toString())
		if (id) {
			sp.set("collection", id)
			sp.set("page", "1")
		} else {
			sp.delete("collection")
			sp.set("page", "1")
		}
		return `${pathname}?${sp.toString()}`
	}

	if (!collections.length) return null

	return (
		<div className="mb-4 flex flex-wrap items-center gap-2">
			<Link
				href={buildHref(undefined)}
				className={`rounded-full border px-3 py-1 text-sm ${
					!selected ? "bg-black text-white" : "bg-white"
				}`}
				prefetch={false}
			>
				All Collections
			</Link>
			{collections.map((c) => (
				<Link
					key={c.id}
					href={buildHref(c.id)}
					className={`rounded-full border px-3 py-1 text-sm ${
						selected === c.id ? "bg-black text-white" : "bg-white"
					}`}
					prefetch={false}
					title={c.title}
				>
					{c.title}
				</Link>
			))}
		</div>
	)
}


