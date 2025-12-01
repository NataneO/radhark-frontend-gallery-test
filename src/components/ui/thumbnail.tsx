import  ThumbnailProps  from '@/interfaces/thumbnail';
import formatDate from '@/utils/date';
import React from 'react';

const Thumbnail: React.FC<ThumbnailProps> = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`transition-all flex flex-col duration-300 ease-in-out hover:-translate-y-1  h-64 bg-gray-200 rounded-lg overflow-hidden  shadow-md hover:shadow-xl cursor-pointer ${
      isActive && "border-cyan-500 border-2" }`}
  >
   
      <img src={item.url} alt="Thumbnail" className="w-[100%] h-[100%] object-cover" />
   
   
    </div>
);

export default React.memo(Thumbnail);
