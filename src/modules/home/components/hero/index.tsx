import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const backendUrl =
    process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  const productImage = `${backendUrl}/static/1765900450089-fricamorelableless-parfume.jpg`

  return (
    <div className="relative h-[78vh] w-full border-b border-ui-border-base bg-black">
      {/* Background image */}
      <Image
        src="/fricLanding.jpg"
        alt="Fricamore — Signature Fragrance"
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Foreground product art (remote from backend) */}
      <div className="pointer-events-none absolute right-6 bottom-6 md:right-12 md:bottom-10 lg:right-16 lg:bottom-12 z-20">
        <div className="relative w-[220px] small:w-[280px] md:w-[340px] lg:w-[380px] aspect-[3/4]">
          {/* soft glow */}
          <div className="absolute -inset-6 rounded-full blur-2xl bg-purple-500/20" />
          <Image
            src={productImage}
            alt="Fricamore bottle"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out will-change-transform"
            sizes="(max-width: 768px) 220px, (max-width: 1024px) 340px, 380px"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 gap-4">
        <Heading
          level="h1"
          className="text-4xl small:text-5xl tracking-[0.25em] uppercase text-white"
        >
          Fricamore
        </Heading>
        <Heading
          level="h2"
          className="text-xl small:text-2xl text-white/80 font-normal"
        >
          Fine Fragrances, Crafted With Intention
        </Heading>

        <div className="mt-6 flex items-center gap-3">
          <LocalizedClientLink href="/store">
            <Button className="px-6 py-2 rounded-full" variant="primary">
              Shop Perfumes
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections/perfumes">
            <Button className="px-6 py-2 rounded-full" variant="secondary">
              Explore Collections
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
