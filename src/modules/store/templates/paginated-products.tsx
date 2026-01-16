import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import ProductPreview from "@modules/products/components/product-preview"
import { listProducts } from "@lib/data/products"
import { listRegions } from "@lib/data/regions"

type PaginatedProductsProps = {
  page: number
  sortBy: string
  countryCode: string
  collectionId?: string
  categoryId?: string
}

export default async function PaginatedProducts({
  page,
  sortBy,
  countryCode,
  collectionId,
  categoryId,
}: PaginatedProductsProps) {
  const regions = await listRegions()

  const region = regions.find((r) =>
    r.countries?.some((c) => c.iso_2 === countryCode)
  )

  if (!region) {
    return <Text>Region not found</Text>
  }

  const { response } = await listProducts({
    pageParam: page,
    queryParams: {
      limit: 12,
      order: sortBy,
      ...(collectionId ? { collection_id: collectionId } : {}),
      ...(categoryId ? { category_id: [categoryId] } : {}),
    },
    countryCode,
  })

  const products = response.products

  if (!products.length) {
    return <Text>No products found</Text>
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product: HttpTypes.StoreProduct) => (
        <ProductPreview key={product.id} product={product} region={region} />
      ))}
    </div>
  )
}
