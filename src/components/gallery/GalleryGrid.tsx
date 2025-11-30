'use client'

import { GalleryGridProps } from '@/interfaces/gallery';
import UploadFileButton from './UploadFileButton';
import GalleryImage from './GalleryImage';

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error }) => {
 
 

  return (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        <GalleryImage items={items}/>
        </div>
        )}
      </div>
  );
};

export default GalleryGrid;
