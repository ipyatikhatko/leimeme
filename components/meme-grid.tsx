"use client";

import MemeCard from "./meme-card";

import { Meme } from "@/app/types/meme";

interface MemeGridProps {
  memes: Meme[];
  onUpdate?: () => void;
}

export default function MemeGrid({ memes }: MemeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
}
