'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Thumbnail from '@/components/ui/thumbnail';
import { handleFileUpload, handlePlusClick } from '@/handlers/galleryHandlers';
import { BASE_URL, BEARER_TOKEN } from '@/utils/apiConfig';

interface GalleryGridProps {
  items: Array<{ url: string }>;
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  nextPageToken: string | null;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, error, onLoadMore, nextPageToken }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && nextPageToken) {
        onLoadMore();
    }
    }
  }, [nextPageToken, onLoadMore]);

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

  return (
    <div className="w-full mx-auto h-[600px] overflow-y-auto bg-gray-200 p-16 rounded-t-xl scrollbar-thin" ref={containerRef}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button
                    variant="outline"
              className="w-50 h-50 flex-shrink-0 border-dashed border-2 text-gray-500 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
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
  );
};

export default GalleryGrid;
