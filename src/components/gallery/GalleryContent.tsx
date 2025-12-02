import React, { useState, useCallback, useEffect } from "react";
import Thumbnail from '@/components/ui/thumbnail';
import { GalleryItem, ImageInfo } from "@/interfaces/image"; 
import ImageModal from "./ImageModal";

interface GalleryContentProps {
  items: Array<GalleryItem>; 
}

const GalleryContent: React.FC<GalleryContentProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectItem = useCallback((index: number) => {
    if (items[index].isOptimistic) return; 
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, [items]); 

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen || items.length === 0) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault(); 
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault(); 
        prevImage();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, items.length, nextImage, prevImage, closeModal]);


  const selectedItem = items[selectedIndex] && items[selectedIndex].isOptimistic 
                     ? null 
                     : items[selectedIndex] as ImageInfo | null;
  

  return (
    <>
      {items.map((item, index) => {
        const realKey = `${item.url}-${item.created_at}`;
        const key = item.isOptimistic ? item.tempId : realKey;

        return (
          <Thumbnail
            key={key} 
            item={item}
            isActive={isModalOpen && index === selectedIndex && !item.isOptimistic}
            onClick={() => selectItem(index)}
          />
        );
      })}
      {isModalOpen && selectedItem && (
        <ImageModal
          item={selectedItem} 
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default GalleryContent;