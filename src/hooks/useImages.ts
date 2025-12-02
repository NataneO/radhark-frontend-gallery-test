'use client'
import { useState, useEffect, useCallback } from 'react';
import { GalleryData } from '@/interfaces/gallery';
import { BEARER_TOKEN, LIST_IMAGES_ENDPOINT } from '@/utils/apiConfig'; 
import { useGalleryStore } from '@/stores/galleryStore'; 
import { GalleryItem } from '@/interfaces/image';

const DEFAULT_PAGE_SIZE = 15;
const SCROLL_THRESHOLD = 200; 

export const useImages = () => {
  const [items, setItems] = useState<GalleryData['items']>([]);
  const [loading, setLoading] = useState(true); 
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const pageSize = DEFAULT_PAGE_SIZE;
  
  const { optimisticItems, clearOptimisticItems } = useGalleryStore(); 

  const fetchImages = useCallback(async (tokenToUse: string | null, isRefresh = false) => {
    const isNextPageLoad = !!tokenToUse && !isRefresh;

    try {
      if (!tokenToUse && !isRefresh) {
        setLoading(true); 
      }
      if (isNextPageLoad) {
         setIsFetchingNextPage(true);
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
      
      if (!tokenToUse) {
        setItems(data.items);
      } else {
        setItems(prevItems => [...prevItems, ...data.items]);
      }

      setNextPageToken(data.page_token || null);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
     
      if (isNextPageLoad) {
          setIsFetchingNextPage(false);
      }
      if (!tokenToUse) {
          setLoading(false);
        
          if (isRefresh) {
            clearOptimisticItems(); 
          }
      }
    }
  }, [pageSize, clearOptimisticItems]); 


  const loadNextPage = useCallback(() => {
    if (nextPageToken === null || isFetchingNextPage) {
      console.log('Cant load next page. Token not found or already fetching.');
      return;
    }
    fetchImages(nextPageToken, false); 
  }, [nextPageToken, isFetchingNextPage, fetchImages]);


   const refreshPageView = useCallback(() => {
    fetchImages(null, true); 
  }, [fetchImages]);

  useEffect(() => {
    fetchImages(null, false);
  }, [fetchImages]);

  useEffect(() => {
    const scrollHandler = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      if (
          !isFetchingNextPage && 
          nextPageToken !== null &&
          scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD
      ) {
        loadNextPage();
      }
    };

    window.addEventListener('scroll', scrollHandler);
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [isFetchingNextPage, nextPageToken, loadNextPage]);

  
  const combinedItems: GalleryItem[] = [...optimisticItems, ...items];


  return {
      items: combinedItems, 
      loading: loading && combinedItems.length === 0, 
      error,
      pageSize,
      nextPageToken,
      loadNextPage,
      refreshPageView,
      isFetchingNextPage 
  };
};