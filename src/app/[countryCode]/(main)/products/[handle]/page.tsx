import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

import { HttpTypes } from "@medusajs/types"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

/**
 * Generate static params for product pages
 */
export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean)
    )

    if (!countryCodes?.length) {
      return []
    }

    const countryProducts = await Promise.all(
      countryCodes.map(async (countryCode) => {
        const { response } = await listProducts({
          countryCode,
          queryParams: {
            limit: 100,
            fields: "handle",
          },
        })

        return response.products.map((product) => ({
          countryCode,
          handle: product.handle,
        }))
      })
    )

    return countryProducts.flat().filter((p) => p.handle)
  } catch (error) {
    console.error(
      `Failed to generate static params for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

/**
 * Safely resolve images for a selected variant
 */
function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
): HttpTypes.StoreProductImage[] {
  const productImages = product.images ?? []

  if (!selectedVariantId || !product.variants?.length) {
    return productImages
  }

  const variant = product.variants.find(
    (v) => v.id === selectedVariantId
  )

  if (!variant?.images?.length) {
    return productImages
  }

  const imageIds = new Set(variant.images.map((img) => img.id))

  return productImages.filter((img) => imageIds.has(img.id))
}

/**
 * Metadata for product page
 */
export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params

  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: product.description ?? product.title,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: product.description ?? product.title,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

/**
 * Product page
 */
export default async function ProductPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const region = await getRegion(params.countryCode)
  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const images = getImagesForVariant(product, searchParams.v_id)

  return (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={params.countryCode}
      images={images}
    />
  )
}
