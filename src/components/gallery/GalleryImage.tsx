import React, { useState } from "react";
import Thumbnail from '@/components/ui/thumbnail';
import { ImageInfo } from "@/interfaces/image";
import ImageModal from './ImageModal';

interface GalleryImageProps {
  items: Array<ImageInfo>;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const closeModal = () => {
    setSelectedIndex(-1);
  }

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
  }

  const prevImage = () => {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }

  return (
    <>
      {items.map((item, index) => (
        <Thumbnail
          key={index}
          item={item}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
      {selectedIndex !== -1 && (
        <ImageModal
          item={items[selectedIndex]}
          isOpen={selectedIndex !== -1}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}

export default GalleryImage;
