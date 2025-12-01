import { GalleryGridProps } from '@/interfaces/gallery';
import GalleryContent from './GalleryContent';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

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

function getGridClasses(size: string) {
  switch (size) {
    case 'large':
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    case 'medium':
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4";
    case 'small':
      return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
    default:
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error }) => {
  const [gridSize, setGridSize] = useState('large');

  return (
    <div>
      <div className="flex justify-end space-x-2 mb-4">
        {['large', 'medium', 'small'].map(size => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-4 py-2 rounded ${gridSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
          <img className="w-5 h-5" src={`grid-${size}.svg`} alt={`${size} grid`} />
          </button>
        ))}
      </div>

      {loading && <SkeletonBody />}

      {error && (
        <div className="w-full h-[200px] flex items-center justify-center rounded-xl shadow-lg text-center text-red-600 bg-white">
          Error: {error}
        </div>
      )}

      {items?.length === 0 && !loading && !error && (
        <div className="w-full h-[200px] flex items-center justify-center rounded-xl shadow-lg text-center bg-white">
          Você ainda não adicionou nenhuma imagem.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className={`grid ${getGridClasses(gridSize)} gap-2`}>
          <GalleryContent items={items} />
        </div>
      )}
    </div>
  );
};

 export default GalleryGrid;
