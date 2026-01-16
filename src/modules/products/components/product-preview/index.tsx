import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import PreviewPrice from "./price"
import { getProductPrice } from "@lib/util/get-product-price"

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  variantId?: string
  isFeatured?: boolean
}

export default function ProductPreview({
  product,
  region,
  variantId,
  isFeatured,
}: ProductPreviewProps) {
  if (!product?.id) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />

        <div className="flex justify-between items-center mt-4">
          <Text className="text-ui-fg-subtle">
            {product.title}
          </Text>

          {cheapestPrice && (
            <PreviewPrice price={cheapestPrice} />
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
