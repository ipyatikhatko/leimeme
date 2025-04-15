import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

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
          href="/list"
        >
          View
        </Link>
        <Link
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
            size: "lg",
          })}
          href="/table"
        >
          Manage
        </Link>
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
