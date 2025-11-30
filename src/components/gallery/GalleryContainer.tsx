'use client'

import React, { useEffect } from 'react';
import { useImages } from '@/hooks/useImages';
import GalleryGrid from './GalleryGrid';
import GalleryHeader from './GalleryHeader';
import { handleScroll } from '@/handlers/galleryHandlers';

export function GalleryContainer() {
  const { items, loading, error, nextPageToken, loadNextPage } = useImages();

  useEffect(() => {
    const scrollHandler = () => handleScroll(nextPageToken, loadNextPage);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [nextPageToken, loadNextPage]);

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
