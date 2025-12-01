'use client'

import { GalleryGridProps } from '@/interfaces/gallery';
import GalleryContent from './GalleryContent';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonBody = () => {
  const skeletonCount = 15;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton key={index} className="w-64 h-64 bg-gray-400" />
      ))}
    </div>
  );
}
const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error }) => {

  return (
    <div>
      {loading && <SkeletonBody/>}
      {error && <p>Error: {error}</p>}
      {items?.length === 0 && <p>Voce ainda nao adicionou nenhuma imagem.</p>}
        {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">

        <GalleryContent items={items}/>
        </div>
        )}
      </div>
  );
};

export default GalleryGrid;
