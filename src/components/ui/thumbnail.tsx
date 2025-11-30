import React from 'react';

interface ThumbnailProps {
  url: string;
  isActive?: boolean;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ url, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`w-50 h-50 bg-gray-200 rounded-lg overflow-hidden border-2 cursor-pointer ${
      isActive ? "border-cyan-500 shadow-md" : "border-transparent hover:border-gray-400"
    }`}
  >
    <img src={url} alt="Thumbnail" className="w-full h-full object-contain" />
  </div>
);

export default React.memo(Thumbnail);
