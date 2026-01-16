"use client"

import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { XMark, ArrowRightMini } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  collections?: HttpTypes.StoreCollection[]
}

export default function SideMenu({
  regions,
  collections = [],
}: SideMenuProps) {
  const toggleState = useToggleState()

  return (
    <div className="h-full flex items-center">
      <Popover className="relative h-full">
        {({ open, close }) => (
          <>
            {/* BUTTON */}
            <Popover.Button className="h-full flex items-center text-sm hover:text-ui-fg-base">
              Menu
            </Popover.Button>

            {/* BACKDROP */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 z-40 bg-black/40"
                onClick={close}
              />
            </Transition>

            {/* PANEL */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition-transform duration-200"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-150"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Popover.Panel className="fixed z-50 inset-y-0 left-0 w-[85%] max-w-sm bg-[rgba(3,7,18,0.95)] text-ui-fg-on-color p-6 flex flex-col justify-between pointer-events-auto">
                {/* CLOSE */}
                <div className="flex justify-end">
                  <button
                    onClick={close}
                    className="hover:opacity-70"
                    aria-label="Close menu"
                  >
                    <XMark />
                  </button>
                </div>

                {/* NAV */}
                <nav className="mt-8">
                  <ul className="flex flex-col gap-6">
                    <li>
                      <LocalizedClientLink
                        href="/"
                        onClick={close}
                        className="text-3xl hover:opacity-70 transition"
                      >
                        Home
                      </LocalizedClientLink>
                    </li>

                    <li>
                      <LocalizedClientLink
                        href="/store"
                        onClick={close}
                        className="text-3xl hover:opacity-70 transition"
                      >
                        Store
                      </LocalizedClientLink>
                    </li>

                    {collections.map((collection) => (
                      <li key={collection.id}>
                        <LocalizedClientLink
                          href={`/collections/${collection.handle}`}
                          onClick={close}
                          className="text-2xl opacity-80 hover:opacity-100 transition"
                        >
                          {collection.title}
                        </LocalizedClientLink>
                      </li>
                    ))}

                    <li>
                      <LocalizedClientLink
                        href="/account"
                        onClick={close}
                        className="text-3xl hover:opacity-70 transition"
                      >
                        Account
                      </LocalizedClientLink>
                    </li>

                    <li>
                      <LocalizedClientLink
                        href="/cart"
                        onClick={close}
                        className="text-3xl hover:opacity-70 transition"
                      >
                        Cart
                      </LocalizedClientLink>
                    </li>
                  </ul>
                </nav>

                {/* FOOTER */}
                <div className="flex flex-col gap-y-6 mt-12">
                  {regions && (
                    <div
                      className="flex justify-between items-center"
                      onMouseEnter={toggleState.open}
                      onMouseLeave={toggleState.close}
                    >
                      <CountrySelect
                        toggleState={toggleState}
                        regions={regions}
                      />
                      <ArrowRightMini
                        className={clx(
                          "transition-transform",
                          toggleState.state && "-rotate-90"
                        )}
                      />
                    </div>
                  )}

                  <Text className="txt-compact-small opacity-70">
                    © {new Date().getFullYear()} Your Store
                  </Text>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}