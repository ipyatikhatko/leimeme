export interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export interface CreateMemeDto {
  name: string;
  image: string;
}

export interface UpdateMemeDto {
  name?: string;
  image?: string;
  likes?: number;
}
