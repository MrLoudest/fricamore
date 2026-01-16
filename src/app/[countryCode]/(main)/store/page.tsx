import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { listCategories } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore our perfumes.",
}

type StorePageProps = {
  params: Promise<{ countryCode: string }> | { countryCode: string }
  searchParams:
    | Promise<{
        sortBy?: SortOptions
        page?: string
        family?: string
        collection?: string
      }>
    | {
        sortBy?: SortOptions
        page?: string
        family?: string
        collection?: string
      }
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const sp = await searchParams
  const pr = await params

  const { sortBy, page, family, collection } = sp

  // STEP 1: normalize the `family` query
  let familyHandle: string | null = family ?? null

  if (
    !familyHandle ||
    familyHandle === "all" ||
    familyHandle === "null" ||
    familyHandle === "undefined" ||
    familyHandle === ""
  ) {
    familyHandle = null
  }

  // STEP 2: if we have a family handle, map it to a real category ID
  let categoryId: string | undefined = undefined

  if (familyHandle) {
    const categories = await listCategories()
    const match = categories.find((c) => c.handle === familyHandle)
    if (match) {
      categoryId = match.id
    }
  }

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={pr.countryCode}
      collectionId={collection}
      categoryId={categoryId}
    />
  )
}
