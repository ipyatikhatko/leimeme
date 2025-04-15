import { NextRequest, NextResponse } from "next/server";

import { getAllMemes, createMeme } from "@/lib/meme-store";
import { CreateMemeDto } from "@/app/types/meme";

export async function GET() {
  const memes = await getAllMemes();

  return NextResponse.json(memes);
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateMemeDto = await request.json();
    const result = await createMeme(body);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
