'use client'
import { useState, useEffect, useCallback } from 'react';
import { GalleryData } from '@/interfaces/Image';
import { BEARER_TOKEN, LIST_IMAGES_ENDPOINT } from '@/utils/apiConfig'; 

const DEFAULT_PAGE_SIZE = 15;

export const useImages = () => {
  const [items, setItems] = useState<GalleryData['items']>([]); 
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null); 
  const pageSize = DEFAULT_PAGE_SIZE;

  const fetchImages = useCallback(async (tokenToUse: string | null) => {
    try {
      if (!tokenToUse) {
        setInitialLoading(true);
      }
      setError(null);

      if (!BEARER_TOKEN) {
         throw new Error("Authentication bearer token not configured.");
      }

      const headers = {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      };

      let url = `${LIST_IMAGES_ENDPOINT}?page_size=${pageSize}`;
      if (tokenToUse) {
        url += `&page_token=${tokenToUse}`;
      }

      const response = await fetch(url, { method: 'GET', headers: headers });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(`Failed to fetch images: ${response.status} - ${errorData.detail || 'Network error'}`);
      }

      const data: GalleryData = await response.json();
      
      setItems(prevItems => [...prevItems, ...data.items]);
      setNextPageToken(data.page_token || null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      if (!tokenToUse) {
        setInitialLoading(false);
      }
    }
  }, [pageSize]); 

  const loadNextPage = () => {
    if (nextPageToken === null) {
      console.log('cant load next page. token not found');
      return;
    }
    fetchImages(nextPageToken);
  };

  useEffect(() => {
    fetchImages(null);
  }, [fetchImages]);

  return { 
      items, 
      loading: initialLoading,
      error, 
      pageSize,
      nextPageToken, 
    loadNextPage
  };
};