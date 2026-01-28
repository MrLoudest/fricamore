import Pagination from "../../components/Pagination"
import ProductCard from "../../components/ProductCard"
import { products } from "../data/products"

const PRODUCTS_PER_PAGE = 4

type StorePageProps = {
  searchParams?: {
    page?: string
  }
}

export default function StorePage(props: StorePageProps) {
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE))
  const pageFromParams = Number(props.searchParams?.page ?? "1")
  const currentPage = Number.isNaN(pageFromParams)
    ? 1
    : Math.min(Math.max(1, pageFromParams), totalPages)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const pagedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  )

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          The shop
        </p>
        <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
          Considered essentials for calm spaces.
        </h1>
        <p className="max-w-2xl text-sm text-neutral-600">
          A concise collection designed to live quietly in your daily routine.
          Thoughtful textures, soft fragrance, and balanced care.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        {pagedProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/store"
      />
    </div>
  )
}
