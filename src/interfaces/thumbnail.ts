import { GalleryItem } from "./image";

interface ThumbnailProps {
  item: GalleryItem;
  isActive?: boolean;
  onClick: () => void;
}

export default ThumbnailProps;