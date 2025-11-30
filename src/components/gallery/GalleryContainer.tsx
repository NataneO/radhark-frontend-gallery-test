'use client'

import { useImages } from '@/hooks/useImages';
import GalleryGrid from './GalleryGrid';
import GalleryHeader from './GalleryHeader';

export function GalleryContainer() {
  const { items, loading, error, nextPageToken, loadNextPage } = useImages();

  return (
   <div className="flex flex-col justify-between h-full">
      <GalleryHeader />
      <GalleryGrid
        items={items}
        loading={loading}
        error={error}
        onLoadMore={loadNextPage}
        nextPageToken={nextPageToken}
      />
    </div>
  );
}
