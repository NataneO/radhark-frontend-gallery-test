import React, { useState } from "react";
import Thumbnail from '@/components/ui/thumbnail';
import { ImageInfo } from "@/interfaces/image";
import ImageModal from "./ImageModal";

interface GalleryImageProps {
  items: Array<ImageInfo>;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectItem = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
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
          isActive={index === selectedIndex}
          onClick={() => selectItem(index)}
        />
      ))}
      {isModalOpen && (
        <ImageModal
          item={items[selectedIndex]}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default GalleryImage;



