'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useImages } from '@/hooks/useImages';
import GalleryGrid from './GalleryGrid';

export function GalleryContainer() {
  const { items, loading, error, nextPageToken, loadNextPage } = useImages();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && nextPageToken) {
      loadNextPage(); 
    }
    }
  }, [nextPageToken, loadNextPage]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
   <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-center h-[300px]">
        <h1 className="text-4xl font-extrabold text-center">Galeria</h1>
        </div>
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
