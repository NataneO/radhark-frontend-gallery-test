import  ThumbnailProps  from '@/interfaces/thumbnail';
import formatDate from '@/utils/date';
import React from 'react';

const Thumbnail: React.FC<ThumbnailProps> = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`transition-all flex flex-col duration-300 ease-in-out hover:-translate-y-1  h-64 bg-gray-200 rounded-lg overflow-hidden  shadow-md hover:shadow-xl cursor-pointer ${
      isActive && "border-cyan-500 border-2" }`}
  >
    <div className="w-full h-[60%] mb-4 ">
      <img src={item.url} alt="Thumbnail" className="w-[100%] h-[100%] object-cover" />
    </div>
    <div className='p-4 w-full h-[40%]  hidden p-2 md:inline lg:inline xl:inline'>
   <div className="">Data de publicacao : {formatDate(item.created_at)}</div>
  <div className="">Data de atualizacao : {formatDate(item.updated_at)}</div>
 </div>
    </div>
);

export default React.memo(Thumbnail);
