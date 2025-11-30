export interface GalleryGridProps {
  items: Array<{ url: string }>;
  loading: boolean;
  error: string | null;
}