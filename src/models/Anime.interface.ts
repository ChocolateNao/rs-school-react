export interface IAnime {
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
