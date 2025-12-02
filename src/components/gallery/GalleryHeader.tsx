import UploadFileButton from "./UploadFileButton";
import React from 'react';

const GalleryHeader: React.FC<{ refreshPageView: () => void; }> = ({ refreshPageView }) => (
  <>
    <UploadFileButton onUpload={refreshPageView} />
    <div className="flex items-center justify-center h-[300px] w-full">
      <img 
        src="/radhark-studio-logo.png" 
        alt="Radhark Studio - Photography Portfolio" 
        className="max-h-[300px] max-w-full h-auto w-auto object-contain p-4" 
      />
    </div>
  </>
);

export default GalleryHeader;