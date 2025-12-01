import React from 'react';
import { ImageInfo } from "@/interfaces/image";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import formatDate from '@/utils/date';

interface ImageModalProps {
  item: ImageInfo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ item, isOpen, onClose, onNext, onPrev }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} className="contain h-[650px] sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          <DialogHeader>
          <DialogTitle>{formatDate(item.created_at)}</DialogTitle>
             <Button className="absolute right-10 top-5" onClick={onClose}>X</Button>
          </DialogHeader>
        <img src={item.url} alt="Selected" className="max-w-[80%] h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] m-auto" />
          <DialogFooter className='flex justify-items-center'>
          <Button onClick={onPrev} variant="outline">Previous</Button>
          <Button onClick={onNext} variant="outline">Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
