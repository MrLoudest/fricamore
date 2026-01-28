import Link from "next/link"
import Price from "./Price"
import { Product } from "../app/data/products"

type ProductCardProps = {
  product: Product
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <Link href={`/product/${props.product.slug}`} className="flex flex-col gap-4">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{props.product.name}</span>
        <span className="text-neutral-500">
          <Price amount={props.product.price} />
        </span>
      </div>
      <p className="text-sm text-neutral-500">
        {props.product.shortDescription}
      </p>
    </Link>
  )
}
