import { Meme, CreateMemeDto, UpdateMemeDto } from "@/app/types/meme";
import {
  getAllMemes as getAllMemesStore,
  getMemeById as getMemeByIdStore,
  createMeme as createMemeStore,
  updateMeme as updateMemeStore,
  deleteMeme as deleteMemeStore,
} from "@/lib/meme-store";

// Error response type
interface ErrorResponse {
  error: string;
}

// Type guard to check if response contains an error
function isErrorResponse(data: any): data is ErrorResponse {
  return data && typeof data === "object" && "error" in data;
}

// ======= Server-side API functions =======
// These directly use the meme-store functions and are intended for server components

export const server = {
  /**
   * Get all memes (server-side)
   */
  getAllMemes: async (): Promise<Meme[]> => {
    return await getAllMemesStore();
  },

  /**
   * Get a meme by ID (server-side)
   */
  getMemeById: async (id: number): Promise<Meme | null> => {
    const meme = await getMemeByIdStore(id);

    return meme || null;
  },

  /**
   * Create a new meme (server-side)
   */
  createMeme: async (
    memeData: CreateMemeDto,
  ): Promise<Meme | ErrorResponse> => {
    const result = await createMemeStore(memeData);

    return result;
  },

  /**
   * Update a meme (server-side)
   */
  updateMeme: async (
    id: number,
    memeData: UpdateMemeDto,
  ): Promise<Meme | ErrorResponse> => {
    const result = await updateMemeStore(id, memeData);

    return result;
  },

  /**
   * Delete a meme (server-side)
   */
  deleteMeme: async (id: number): Promise<boolean> => {
    return await deleteMemeStore(id);
  },
};

// ======= Client-side API functions =======
// These use fetch to call the API routes and are intended for client components

export const client = {
  /**
   * Get all memes (client-side)
   */
  getAllMemes: async (): Promise<Meme[]> => {
    try {
      const response = await fetch("/api/memes");

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          isErrorResponse(errorData)
            ? errorData.error
            : "Failed to fetch memes",
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching memes:", error);

      return [];
    }
  },

  /**
   * Get a meme by ID (client-side)
   */
  getMemeById: async (id: number): Promise<Meme | null> => {
    try {
      const response = await fetch(`/api/memes/${id}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json();

        throw new Error(
          isErrorResponse(errorData) ? errorData.error : "Failed to fetch meme",
        );
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching meme ${id}:`, error);

      return null;
    }
  },

  /**
   * Create a new meme (client-side)
   */
  createMeme: async (
    memeData: CreateMemeDto,
  ): Promise<Meme | ErrorResponse> => {
    try {
      const response = await fetch("/api/memes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memeData),
      });

      const data = await response.json();

      if (!response.ok) {
        return isErrorResponse(data)
          ? data
          : { error: "Failed to create meme" };
      }

      return data;
    } catch (error) {
      console.error("Error creating meme:", error);

      return { error: "An unexpected error occurred" };
    }
  },

  /**
   * Update a meme (client-side)
   */
  updateMeme: async (
    id: number,
    memeData: UpdateMemeDto,
  ): Promise<Meme | ErrorResponse> => {
    try {
      const response = await fetch(`/api/memes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memeData),
      });

      const data = await response.json();

      if (!response.ok) {
        return isErrorResponse(data)
          ? data
          : { error: "Failed to update meme" };
      }

      return data;
    } catch (error) {
      console.error(`Error updating meme ${id}:`, error);

      return { error: "An unexpected error occurred" };
    }
  },

  /**
   * Delete a meme (client-side)
   */
  deleteMeme: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/memes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error deleting meme ${id}:`, error);

      return false;
    }
  },
};
