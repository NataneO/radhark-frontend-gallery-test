export interface ImageInfo { //imageData reserved
  url: string; 
  created_at: string;
  updated_at: string;
}


export interface ImageModalProps {
  item: ImageInfo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}
