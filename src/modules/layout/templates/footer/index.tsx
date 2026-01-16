import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-white">
      <div className="content-container flex flex-col w-full">
        {/* Top */}
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-20">
          {/* Brand */}
          <div>
            <LocalizedClientLink
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              Your Store
            </LocalizedClientLink>
            <Text className="mt-2 text-sm text-ui-fg-subtle max-w-xs">
              Premium products, thoughtfully curated.
            </Text>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            {/* Categories */}
            {productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-medium">Categories</span>
                <ul className="grid gap-2 text-ui-fg-subtle">
                  {productCategories
                    .filter((c) => !c.parent_category)
                    .slice(0, 6)
                    .map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base"
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-medium">Collections</span>
                <ul
                  className={clx("grid gap-2 text-ui-fg-subtle", {
                    "grid-cols-2": collections.length > 4,
                  })}
                >
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal */}
            <div className="flex flex-col gap-y-2">
              <span className="font-medium">Legal</span>
              <ul className="grid gap-2 text-ui-fg-subtle">
                <li>Privacy policy</li>
                <li>Terms & conditions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex w-full justify-between border-t py-6 text-xs text-ui-fg-muted">
          <Text>
            © {new Date().getFullYear()} Your Store. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
