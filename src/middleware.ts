export const runtime = "nodejs"

import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

// Sweden is your default region
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "se"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  if (
    regionMapCache.regionMap.size === 0 ||
    regionMapCache.regionMapUpdated < Date.now() - 1000 * 60 * 60
  ) {
    try {
      if (!BACKEND_URL || !PUBLISHABLE_API_KEY) {
        // Fall back immediately to default if envs are missing
        regionMapCache.regionMap.clear()
        regionMapCache.regionMap.set(
          DEFAULT_REGION.toLowerCase(),
          {} as unknown as HttpTypes.StoreRegion
        )
        regionMapCache.regionMapUpdated = Date.now()
        return regionMapCache.regionMap
      }

      const response = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch regions")
      }

      const { regions } = await response.json()

      regionMapCache.regionMap.clear()

      if (regions && regions.length) {
        regions.forEach((region: HttpTypes.StoreRegion) => {
          region.countries?.forEach((country) => {
            if (country.iso_2) {
              regionMapCache.regionMap.set(country.iso_2.toLowerCase(), region)
            }
          })
        })
      } else {
        // Graceful fallback to default region key if none configured
        regionMapCache.regionMap.set(
          DEFAULT_REGION.toLowerCase(),
          {} as unknown as HttpTypes.StoreRegion
        )
      }

      regionMapCache.regionMapUpdated = Date.now()
    } catch {
      // Never block page render due to regions; ensure default exists
      regionMapCache.regionMap.clear()
      regionMapCache.regionMap.set(
        DEFAULT_REGION.toLowerCase(),
        {} as unknown as HttpTypes.StoreRegion
      )
      regionMapCache.regionMapUpdated = Date.now()
    }
  }

  return regionMapCache.regionMap
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  const urlCountry = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
  const vercelCountry = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()

  if (urlCountry && regionMap.has(urlCountry)) {
    return urlCountry
  }

  if (vercelCountry && regionMap.has(vercelCountry)) {
    return vercelCountry
  }

  if (regionMap.has(DEFAULT_REGION)) {
    return DEFAULT_REGION
  }

  return regionMap.keys().next().value
}

export async function middleware(request: NextRequest) {
  // Ignore static assets
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const regionMap = await getRegionMap("default")
  const countryCode = await getCountryCode(request, regionMap)

  if (!countryCode) {
    return new NextResponse(
      "No valid region configured. Please check Medusa Admin.",
      { status: 500 }
    )
  }

  const pathname = request.nextUrl.pathname

  if (!pathname.startsWith(`/${countryCode}`)) {
    const redirectUrl = new URL(
      `/${countryCode}${pathname === "/" ? "" : pathname}`,
      request.url
    )
    redirectUrl.search = request.nextUrl.search
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)",
  ],
}
