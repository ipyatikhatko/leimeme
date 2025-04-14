import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import Image from "next/image";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-12 md:py-16">
      <div className="inline-block max-w-2xl text-center">
        <span className={title()}>Your&nbsp;</span>
        <span className={title({ color: "violet" })}>Meme&nbsp;</span>
        <span className={title()}>Collection</span>
        <div className={subtitle({ class: "mt-4" })}>
          Discover, organize, and share your favorite memes from across the web
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
            size: "lg",
          })}
          href="/collection"
        >
          View Collection
        </Link>
        <Link
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
            size: "lg",
          })}
          href="/add-meme"
        >
          Add New Meme
        </Link>
      </div>

      <div className="relative w-full max-w-4xl mt-8 grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm border border-foreground/10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <Image
              fill
              alt={`Sample meme ${i}`}
              className="object-cover"
              priority={i === 1}
              sizes="(max-width: 768px) 100vw, 33vw"
              src={`/images/sample-meme-${i}.webp`}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center max-w-md">
        <p className="text-foreground/70">
          Easily manage your meme collection with our intuitive interface. Add
          external links, organize by categories, and share with friends.
        </p>
      </div>
    </section>
  );
}
