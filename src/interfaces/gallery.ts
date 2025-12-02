import { ImageInfo } from "./image";
import { GalleryItem } from "./image";

export interface GalleryGridProps {
  items: Array<GalleryItem>; 
  loading: boolean;
  error: string | null;
  isFetchingNextPage: boolean;
  hasMore: boolean; 
}

export interface GalleryData {
  page_token: string;
  total_items: number;
  page_size: number;
  items: ImageInfo[];
}

