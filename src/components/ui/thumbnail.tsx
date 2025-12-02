import ThumbnailProps from '@/interfaces/thumbnail';
import formatDate from '@/utils/date';
import React from 'react';
import { Skeleton } from './skeleton'; 
import { cn } from '@/lib/utils'; 

const Thumbnail: React.FC<ThumbnailProps> = ({ item, isActive, onClick }) => {
    
    if (item.isOptimistic) {
        return (
            <div 
                className={cn(
                    "h-64 w-full rounded-lg overflow-hidden relative shadow-md",
                    "cursor-wait bg-gray-300"
                )}
            >
                <img 
                    src={item.url} 
                    alt="Pré-visualização de imagem a carregar" 
                    className="w-full h-full object-cover opacity-50"
                />
             
                <Skeleton 
                    key={item.tempId} 
                    className="absolute inset-0 w-full h-full bg-gray-400/50 animate-pulse flex items-center justify-center"
                >
                    <span className="text-gray-700 text-sm font-semibold z-10">Carregando imagem...</span>
                </Skeleton>
            </div>
        );
    }
    
    return (
        <div
            onClick={onClick}
            title={`Clique para visualizar imagem de ${formatDate(item.created_at)}`}
            className={`
                transition-all duration-300 ease-in-out 
                hover:-translate-y-1 transform
                h-64 w-full bg-gray-200 rounded-lg overflow-hidden 
                shadow-md hover:shadow-xl cursor-pointer relative 
                ${isActive ? "ring-4 ring-cyan-500 ring-offset-2" : "border border-transparent"}
            `}
        >
            <img 
                src={item.url} 
                alt={`Imagem de galeria criada em ${formatDate(item.created_at)}`} 
                className="w-full h-full object-cover" 
                loading="lazy" 
            />
        </div>
    );
};

export default React.memo(Thumbnail);