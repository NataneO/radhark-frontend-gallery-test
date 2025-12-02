'use client'

import { useImages } from '@/hooks/useImages';
import GalleryGrid from './GalleryGrid';
import GalleryHeader from './GalleryHeader';

export function GalleryContainer() {
  const { items, loading, error, refreshPageView, isFetchingNextPage, nextPageToken } = useImages();
  const hasMore = nextPageToken !== null;

  return (
    <div className="flex flex-col justify-between h-full mb-4">
      <GalleryHeader refreshPageView={refreshPageView} />
      <GalleryGrid
        items={items}
        loading={loading}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
        hasMore={hasMore} 
      />
    </div>
  );
}