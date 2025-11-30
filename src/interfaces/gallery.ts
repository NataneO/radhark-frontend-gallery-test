import { ImageInfo } from "./image";

export interface GalleryGridProps {
  items: Array<ImageInfo>;
  loading: boolean;
  error: string | null;
}

export interface GalleryData {
  page_token: string;
  total_items: number;
  page_size: number;
  items: ImageInfo[];
}