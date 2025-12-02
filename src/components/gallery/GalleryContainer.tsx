'use client'

import React from 'react';
import { useImages } from '@/hooks/useImages';
import GalleryGrid from './GalleryGrid';
import GalleryHeader from './GalleryHeader';

export function GalleryContainer() {
  const { items, loading, error, refreshPageView } = useImages(); 

  return (
    <div className="flex flex-col justify-between h-full mb-4">
      <GalleryHeader refreshPageView={refreshPageView} />
      <GalleryGrid
        items={items}
        loading={loading}
        error={error}
      />
    </div>
  );
}