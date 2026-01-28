import { notFound } from "next/navigation"
import AddToCartButton from "../../../components/AddToCartButton"
import Price from "../../../components/Price"
import { products } from "../../data/products"

type ProductPageProps = {
  params: {
    slug: string
  }
}

export default function ProductPage(props: ProductPageProps) {
  const product = products.find((entry) => entry.slug === props.params.slug)
  if (!product) {
    notFound()
  }

  const secondaryImages = [product.image, product.image]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:gap-16">
      <div className="flex-1 space-y-6">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {secondaryImages.map((image, index) => (
            <div
              key={`${product.slug}-secondary-${index}`}
              className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100"
            >
              <img
                src={image}
                alt={`${product.name} detail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Product
          </p>
          <h1 className="text-3xl font-medium text-neutral-900">
            {product.name}
          </h1>
          <p className="text-lg text-neutral-700">
            <Price amount={product.price} />
          </p>
          <p className="text-sm text-neutral-600">{product.fullDescription}</p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-500">Delivery</p>
          <p className="text-sm text-neutral-700">
            Complimentary shipping on all orders. Delivery in 3-5 days.
          </p>
        </div>

        <AddToCartButton slug={product.slug} />
      </div>
    </div>
  )
}
