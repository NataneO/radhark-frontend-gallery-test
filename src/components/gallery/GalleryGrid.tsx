import { GalleryGridProps } from '@/interfaces/gallery';
import GalleryContent from './GalleryContent';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, Grid3x3, Square, LucideIcon } from 'lucide-react'; 

const SKELETON_COUNT = 12;

const SkeletonBody: React.FC<{ gridClasses: string }> = ({ gridClasses }) => {
  return (
    <div className={cn("grid gap-4", gridClasses)}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <Skeleton key={index} className="w-full h-64 bg-gray-400" />
      ))}
    </div>
  );
}

function getGridClasses(size: string): string {
  switch (size) {
    case 'large':
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    case 'medium':
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4";
    case 'small':
      return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
    default:
      return getGridClasses('large');
  }
}

const IconMap: Record<string, LucideIcon> = {
    'small': Square,
    'medium': LayoutGrid,
    'large': Grid3x3, 
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error }) => {
  const [gridSize, setGridSize] = useState('large');
  const currentGridClasses = getGridClasses(gridSize);

  const gridSizes = [
    { id: 'small', iconComponent: IconMap.small, alt: 'Visualização Pequena (Square)' },
   { id: 'medium', iconComponent: IconMap.medium, alt: 'Visualização Média (Layout Grid)' },
    { id: 'large', iconComponent: IconMap.large, alt: 'Visualização Grande (3x3 Grid)' }, 
   
    
  ];

  return (
    <div>
      <div className="flex justify-end space-x-2 mb-4">
        {gridSizes.map(({ id, iconComponent: Icon, alt }) => {
          const isActive = gridSize === id;
          
          return (
            <Button
              key={id}
              variant={'outline'} 
              size="icon-sm" 
              className={cn(
                "text-gray-500 border-gray-300 hover:bg-cyan-100/50 hover:border-cyan-400/80", 
                {
                  "bg-primary text-blue-600 border-primary hover:bg-primary/90 hover:text-primary-foreground": isActive
                }
              )}
              onClick={() => setGridSize(id)}
              title={alt}
            >
              <Icon 
                className={cn(
                  "w-4 h-4",
                  !isActive && 'text-gray-600'
                )} 
              />
            </Button>
          );
        })}
      </div>

      {loading && items.length === 0 && <SkeletonBody gridClasses={currentGridClasses} />}

      {error && (
        <div className="w-full p-8 flex items-center justify-center rounded-xl shadow-lg text-center text-red-600 bg-white">
          <p className="font-bold text-lg">Erro ao carregar imagens: {error}</p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="w-full p-8 flex flex-col items-center justify-center rounded-xl shadow-lg text-center bg-white">
          <p className="text-xl font-semibold">Você ainda não adicionou nenhuma imagem.</p>
          <p className='text-sm text-gray-500 mt-2'>Clique no botão "Adicionar arquivo" acima para começar.</p>
        </div>
      )}

      {items.length > 0 && (
        <div className={cn("grid gap-4", currentGridClasses)}>
          <GalleryContent items={items} />
        </div>
      )}
    </div>
  );
};

 export default GalleryGrid;