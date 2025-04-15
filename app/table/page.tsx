import MemeTable from "@/components/meme-table";
import { server } from "@/lib/api";

export default async function TablePage() {
  // Fetch memes server-side for initial render
  const memes = await server.getAllMemes();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Memes Table</h1>
      <MemeTable initialMemes={memes} />
    </div>
  );
}
