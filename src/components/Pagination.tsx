import Link from "next/link"

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination(props: PaginationProps) {
  if (props.totalPages <= 1) {
    return null
  }

  const createHref = (page: number) =>
    page === 1 ? props.basePath : `${props.basePath}?page=${page}`

  const pages = Array.from({ length: props.totalPages }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-center gap-3 text-sm text-neutral-500">
      <Link
        href={createHref(Math.max(1, props.currentPage - 1))}
        className={props.currentPage === 1 ? "pointer-events-none opacity-40" : ""}
      >
        Prev
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={createHref(page)}
          className={
            page === props.currentPage
              ? "rounded-full border border-neutral-900 px-3 py-1 text-neutral-900"
              : "px-3 py-1"
          }
        >
          {page}
        </Link>
      ))}
      <Link
        href={createHref(Math.min(props.totalPages, props.currentPage + 1))}
        className={
          props.currentPage === props.totalPages
            ? "pointer-events-none opacity-40"
            : ""
        }
      >
        Next
      </Link>
    </div>
  )
}
