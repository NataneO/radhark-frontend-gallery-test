import { ImageInfo } from "./image";

interface ThumbnailProps {
  item: ImageInfo;
  isActive?: boolean;
  onClick: () => void;
}

export default ThumbnailProps;
