'use client'
import { useRef, useCallback, useEffect } from 'react';

import { handleScroll } from '@/handlers/galleryHandlers';
import { GalleryGridProps } from '@/interfaces/gallery';
import UploadFileButton from './UploadFileButton';
import GalleryImage from './GalleryImage';

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error, onLoadMore, nextPageToken }) => {
 
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollCallback = useCallback(() => {
    handleScroll(containerRef, nextPageToken, onLoadMore);
  }, [nextPageToken, onLoadMore]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener('scroll', handleScrollCallback);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener('scroll', handleScrollCallback);
      }
    };
  }, [handleScrollCallback]);

  return (
    <div className="w-full mx-auto h-[600px] overflow-y-auto bg-gray-200 p-16 rounded-t-xl scrollbar-thin" ref={containerRef}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <UploadFileButton />
        <GalleryImage items={items}/>
        </div>
        )}
      </div>
  );
};

export default GalleryGrid;
