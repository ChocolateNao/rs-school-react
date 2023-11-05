export interface Anime {
  mal_id: number;
  url: string;
  title: string;
  type: string;
  score: number;
  airing: boolean;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
}

export interface IAnimeDetails extends Anime {
  status: string;
  year: number;
  rating: string;
  genres: [name: string];
}
