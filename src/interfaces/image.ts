export interface ImageInfo { 
  url: string; 
  created_at: string;
  updated_at: string;
}

export interface OptimisticPreview {
  isOptimistic: boolean; 
  tempId: string; 
}

export type GalleryItem = ImageInfo & Partial<OptimisticPreview>; 


export interface ImageModalProps {
  item: ImageInfo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}