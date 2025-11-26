import { useState, useEffect, useCallback } from 'react';
import { GalleryData, ImageItem } from '@/types/Image'; 
import { BEARER_TOKEN, LIST_IMAGES_ENDPOINT } from '@/utils/apiConfig'; 


export const useImages = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!BEARER_TOKEN) {
         throw new Error("Authentication bearer token not configured.");
      }

      const headers = {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(LIST_IMAGES_ENDPOINT, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to fetch images: ${response.status} - ${errorData.message || 'Network error'}`);
      }

      const data: GalleryData = await response.json();
      setImages(data.items); 
    
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, error, fetchImages };
};