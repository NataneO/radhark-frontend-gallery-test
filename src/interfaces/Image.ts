export interface ImageItem {
  url: string; 
  created_at: string;
  updated_at: string;
}

export interface GalleryData {
  page_token: string;
  total_items: number;
  page_size: number;
  items: ImageItem[];
}