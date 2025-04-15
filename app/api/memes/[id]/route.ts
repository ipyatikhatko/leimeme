import { NextResponse } from "next/server";

import { getMemeById, updateMeme, deleteMeme } from "@/lib/meme-store";
import { UpdateMemeDto } from "@/app/types/meme";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const meme = await getMemeById(id);

  if (!meme) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }

  return NextResponse.json(meme);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const body: UpdateMemeDto = await request.json();
    const result = await updateMeme(id, body);

    if ("error" in result) {
      const status = result.error === "Meme not found" ? 404 : 400;

      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const success = await deleteMeme(id);

  if (!success) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
