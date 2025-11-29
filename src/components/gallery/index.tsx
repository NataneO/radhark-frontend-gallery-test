'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useImages } from '@/hooks/useImages';
import { handleFileUpload, handlePlusClick } from '@/handlers/galleryHandlers';
import { BEARER_TOKEN, BASE_URL } from '@/utils/apiConfig';

const Thumbnail: React.FC<{ url: string; isActive?: boolean; onClick: () => void }> = React.memo(({ url, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`w-50 h-50 bg-gray-200 rounded-lg overflow-hidden border-2 cursor-pointer ${
      isActive ? "border-cyan-500 shadow-md" : "border-transparent hover:border-gray-400"
    }`}
  >
    <img src={url} alt="Thumbnail" className="w-full h-full object-contain" />
  </div>
));

export function Gallery() {
  const { items, loading, error, nextPageToken, loadNextPage } = useImages();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && nextPageToken) {
      loadNextPage(); 
    }
    }
  }, [nextPageToken, loadNextPage]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  async function uploadFileToSignedUrl(signedUrl: string, file: File) {
    try {
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }
    
      const saveResponse = await fetch(`${BASE_URL}/api/v1/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ url: signedUrl.split("?")[0] }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save image');
      }

      console.log('Image saved successfully');
    } catch (error) {
      console.error('Error during upload or save:', error);
    }
  }

  return (
   <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-center h-[300px]">
        <h1 className="text-4xl font-extrabold text-center">Galeria</h1>
        </div>

      <div className="w-full mx-auto h-[600px] overflow-y-auto  bg-gray-50" ref={containerRef}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button
                    variant="outline"
              className="w-32 h-32 flex-shrink-0 border-dashed border-2 text-gray-500 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
                    onClick={() => {
                      if (fileInputRef.current) {
                        handlePlusClick(fileInputRef);
                      }
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      if (fileInputRef.current) {
                        handleFileUpload(event, fileInputRef, uploadFileToSignedUrl);
                      }
                    }}
                  />
            {items.map((item, index) => (
                    <Thumbnail
                      key={index}
                      url={item.url}
                      isActive={index === selectedIndex}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
        </div>
        )}
      </div>
      </div>
  );
}
