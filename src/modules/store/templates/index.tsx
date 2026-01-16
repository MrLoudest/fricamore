import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

import { listCategories } from "@lib/data/categories"
import FamilyMenu from "../components/family-menu"
import { listCollections } from "@lib/data/collections"
import CollectionMenu from "../components/collection-menu"

type StoreTemplateProps = {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  collectionId?: string
  categoryId?: string
}

export default function StoreTemplate({
  sortBy,
  page,
  countryCode,
  collectionId,
  categoryId,
}: StoreTemplateProps) {
  const pageNumber = page ? parseInt(page, 10) : 1

  return (
    <div className="content-container">
      {/* Collections filter menu */}
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <_CollectionsBlock />

      {/* Divider + Category (Families) row */}
      <div className="border-t border-ui-border-base mt-2 pt-3">
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <_FamiliesBlock />
      </div>

      <PaginatedProducts
        page={pageNumber}
        sortBy={sortBy || "created_at"}
        countryCode={countryCode}
        collectionId={collectionId}
        categoryId={categoryId}
      />
    </div>
  )
}

async function _FamiliesBlock() {
  // Get real Medusa categories
  const categories = await listCategories()

  // Convert them into the format FamilyMenu expects
  const families = categories
    .filter((c) => !c.parent_category) // only top-level categories
    .map((c) => ({
      id: c.handle, // used in ?family=<handle>
      value: c.name, // label for the chip
    }))

  if (!families.length) return null

  return <FamilyMenu families={families} />
}

async function _CollectionsBlock() {
  const { collections } = await listCollections({ limit: "100" })
  if (!collections.length) return null
  return <CollectionMenu collections={collections} />
}
