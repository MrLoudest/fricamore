type ProductImage = {
  url: string
  sort_order: number | null
}

export type ProductListItem = {
  id: string
  name: string
  description: string | null
  price: number
  images: ProductImage[]
}

type ProductGridProps = {
  products: ProductListItem[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return <p>No products found.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const image = product.images
          .slice()
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0]

        return (
          <article
            key={product.id}
            className="flex flex-col gap-2 border border-gray-200 p-3"
          >
            {image ? (
              <img
                src={image.url}
                alt={product.name}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-40 w-full bg-gray-100" />
            )}
            <h3 className="text-sm font-medium">{product.name}</h3>
            {product.description ? (
              <p className="text-xs text-gray-600">{product.description}</p>
            ) : null}
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          </article>
        )
      })}
    </div>
  )
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100)
}
