import React, { useState } from "react";
import Thumbnail from '@/components/ui/thumbnail';

interface GalleryImageProps {
  items: Array<{ url: string }>;
}
const GalleryImage: React.FC<GalleryImageProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {items.map((item, index) => (
        <Thumbnail
          key={index}
          url={item.url}
          isActive={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </>
  );
}
export default GalleryImage;
