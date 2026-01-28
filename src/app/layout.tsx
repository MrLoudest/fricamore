import { Metadata } from "next"
import { Suspense } from "react"
import AppShell from "components/AppShell"
import "styles/globals.css"

export const metadata: Metadata = {
  title: "Frica — Quiet Luxury",
  description: "A calm, editorial storefront experience.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        <Suspense fallback={null}>
          <AppShell>{props.children}</AppShell>
        </Suspense>
      </body>
    </html>
  )
}
