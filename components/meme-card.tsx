import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

import { HeartIcon } from "./icons/Heart";

import { Meme } from "@/app/types/meme";

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  return (
    <Card key={meme.id} className="max-w-full flex flex-col group">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md font-semibold">{meme.name}</p>
        </div>
      </CardHeader>
      <CardBody className="flex-1 flex flex-col justify-end p-4 hover:scale-105 transition-transform">
        <a
          className="block overflow-hidden"
          href={meme.image}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt={meme.name}
            className="w-full aspect-square object-cover"
            src={meme.image}
          />
        </a>
      </CardBody>
      <CardFooter className="flex justify-between items-center gap-2">
        <Button
          as="a"
          color="default"
          href={meme.image}
          rel="noopener noreferrer"
          size="sm"
          target="_blank"
          variant="flat"
        >
          Open image
        </Button>
        <div className="flex items-center gap-2 text-default-400">
          <HeartIcon className="pointer-events-none flex-shrink-0" size={20} />
          <p className="text-sm">{meme.likes}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
