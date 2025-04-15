import { Suspense } from "react";

import { server } from "@/lib/api";
import MemeGrid from "@/components/meme-grid";

export default async function ListPage() {
  const memes = await server.getAllMemes();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Meme List</h1>
      <Suspense fallback={<div>Loading memes...</div>}>
        <MemeGrid memes={memes} />
      </Suspense>
    </div>
  );
}
