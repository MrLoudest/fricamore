import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

type CollectionTemplateProps = {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  categories: HttpTypes.StoreProductCategory[]
  page?: string
  countryCode: string
}

export default function CollectionTemplate({
  sortBy,
  collection,
  categories,
  countryCode,
}: CollectionTemplateProps) {
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      {/* Left sidebar (sorting + categories later) */}
      <RefinementList sortBy={sort} />

      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>

        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length || 0}
            />
          }
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {collection.products?.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
                region={collection.region}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  )
}
