import { Meme, CreateMemeDto, UpdateMemeDto } from "@/app/types/meme";

// Initial meme data
const initialMemes: Meme[] = [
  {
    id: 1,
    name: "The work is mysterious and important",
    image: "https://i.imgflip.com/9ibw0b.png",
    likes: 99,
  },
  {
    id: 2,
    name: "JD Vance We're Going To",
    image: "https://i.imgflip.com/9iq884.jpg",
    likes: 9,
  },
  {
    id: 3,
    name: "Tralalero Tralala",
    image: "https://i.imgflip.com/9p82jm.jpg",
    likes: 9,
  },
  {
    id: 4,
    name: "Distracted Boyfriend",
    image: "https://imgflip.com/s/meme/Distracted-Boyfriend.jpg",
    likes: 9,
  },
  {
    id: 5,
    name: "Drake Hotline Bling",
    image: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
    likes: 12,
  },
  {
    id: 6,
    name: "Two Buttons",
    image: "https://imgflip.com/s/meme/Two-Buttons.jpg",
    likes: 13,
  },
  {
    id: 7,
    name: "Cooked dog",
    image: "https://i.imgflip.com/9grj9y.png",
    likes: 14,
  },
  {
    id: 8,
    name: "Tung Tung Tung Sahur",
    image: "https://i.imgflip.com/9nkemr.jpg",
    likes: 9,
  },
  {
    id: 9,
    name: "Megamind peeking",
    image: "https://i.imgflip.com/64sz4u.png",
    likes: 9,
  },
  {
    id: 10,
    name: "Laughing Leo",
    image: "https://imgflip.com/s/meme/Laughing-Leo.png",
    likes: 9,
  },
];

// Extend global this to include our storage
declare global {
  var memeStore: {
    memes: Meme[];
    nextId: number;
  };
}

// Initialize global store if it doesn't exist
if (!globalThis.memeStore) {
  globalThis.memeStore = {
    memes: [...initialMemes],
    nextId: Math.max(...initialMemes.map((meme) => meme.id)) + 1,
  };
}

// Validation functions
export function isValidName(name: string): boolean {
  return typeof name === "string" && name.length >= 3 && name.length <= 100;
}

export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    return (
      ["http:", "https:"].includes(parsedUrl.protocol) &&
      /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/.test(parsedUrl.pathname)
    );
  } catch {
    return false;
  }
}

// CRUD operations
export async function getAllMemes(): Promise<Meme[]> {
  return [...globalThis.memeStore.memes];
}

export async function getMemeById(id: number): Promise<Meme | undefined> {
  return globalThis.memeStore.memes.find((meme) => meme.id === id);
}

export async function createMeme(
  memeData: CreateMemeDto,
): Promise<Meme | { error: string }> {
  // Validate name
  if (!isValidName(memeData.name)) {
    return { error: "Name must be between 3 and 100 characters" };
  }

  // Validate image URL
  if (!isValidImageUrl(memeData.image)) {
    return {
      error: "Invalid image URL. Must be a valid URL pointing to an image file",
    };
  }

  const newMeme: Meme = {
    id: globalThis.memeStore.nextId++,
    name: memeData.name,
    image: memeData.image,
    likes: Math.floor(Math.random() * 100), // Random number between 0-99
  };

  globalThis.memeStore.memes.push(newMeme);

  return newMeme;
}

export async function updateMeme(
  id: number,
  memeData: UpdateMemeDto,
): Promise<Meme | { error: string }> {
  const index = globalThis.memeStore.memes.findIndex((meme) => meme.id === id);

  if (index === -1) {
    return { error: "Meme not found" };
  }

  // Validate name if provided
  if (memeData.name !== undefined && !isValidName(memeData.name)) {
    return { error: "Name must be between 3 and 100 characters" };
  }

  // Validate image URL if provided
  if (memeData.image !== undefined && !isValidImageUrl(memeData.image)) {
    return {
      error: "Invalid image URL. Must be a valid URL pointing to an image file",
    };
  }

  // Validate likes if provided
  if (
    memeData.likes !== undefined &&
    (memeData.likes < 0 || memeData.likes > 99)
  ) {
    return { error: "Likes must be between 0 and 99" };
  }

  // Update the meme
  const updatedMeme = {
    ...globalThis.memeStore.memes[index],
    ...memeData,
  };

  globalThis.memeStore.memes[index] = updatedMeme;

  return updatedMeme;
}

export async function deleteMeme(id: number): Promise<boolean> {
  const initialLength = globalThis.memeStore.memes.length;

  globalThis.memeStore.memes = globalThis.memeStore.memes.filter(
    (meme) => meme.id !== id,
  );

  return globalThis.memeStore.memes.length < initialLength;
}
