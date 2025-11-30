import React from 'react';

interface ThumbnailProps {
  url: string;
  isActive?: boolean;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ url, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`transition-all flex flex-col duration-300 ease-in-out hover:-translate-y-1  h-64 bg-gray-200 rounded-lg overflow-hidden  shadow-md hover:shadow-xl cursor-pointer ${
      isActive && "border-cyan-500 border-2" }`}
  >
    <div className="w-full h-[60%] mb-4 p-4">
      <img src={url} alt="Thumbnail" className="w-full h-full object-contain" />
      </div>
   <div className="w-full h-[40%] bg-slate-50 hidden p-2 md:inline lg:inline xl:inline">Data de publicacao :</div>
  </div>
);

export default React.memo(Thumbnail);
