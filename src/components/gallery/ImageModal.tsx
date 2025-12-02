import React from 'react';
import { ImageModalProps } from "@/interfaces/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import formatDate from '@/utils/date';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; 
import { cn } from '@/lib/utils'; 

const ImageModal: React.FC<ImageModalProps> = ({ item, isOpen, onClose, onNext, onPrev }) => {
  const CYAN_COLOR = 'text-cyan-400 drop-shadow-lg'; 
  const ICON_SIZE = 'lg:size-20 md:size-10 sm:size-5'; 
  const BUTTON_SIZE_CLASS = 'lg:size-[10rem] md:size-[5rem] sm:size-[2rem]'; 
  const Z_INDEX_CONTROLS = 'z-[60]'; 

  return (
    <Dialog open={isOpen}>
      <div className={cn("fixed inset-0 pointer-events-none", Z_INDEX_CONTROLS)}>
        <div className="absolute top-0 right-0 p-6 pointer-events-auto">
          <Button
                onClick={onClose} 
                variant="ghost" 
                className={cn(CYAN_COLOR, BUTTON_SIZE_CLASS, "hover:bg-white/10")} 
                title="Fechar (ESC)"
            >
                <X className={ICON_SIZE} />
            </Button>
        </div>

        <DialogTitle className="absolute top-0 left-0 p-8 flex items-center pointer-events-none">
          <span className={cn("text-lg font-semibold text-white drop-shadow-lg", "hidden sm:block pointer-events-auto")}>
              {formatDate(item.created_at)}
            </span>
        </DialogTitle>

        <div className="flex justify-between items-center h-full p-6 pointer-events-none">
            <Button
              onClick={onPrev}
              variant="ghost" 
              className={cn(CYAN_COLOR, BUTTON_SIZE_CLASS, "hover:bg-white/10 pointer-events-auto")}
              title="Anterior (Seta Esquerda)"
            >
              <ChevronLeft className={ICON_SIZE} />
            </Button>

            <Button 
              onClick={onNext} 
              variant="ghost" 
              className={cn(CYAN_COLOR, BUTTON_SIZE_CLASS, "hover:bg-white/10 pointer-events-auto")}
              title="Próxima (Seta Direita)"
            >
              <ChevronRight className={ICON_SIZE} />
            </Button>
        </div>
      </div>

      <DialogContent showCloseButton={false} className="w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <img 
                src={item.url} 
                alt="Selected Image" 
                className="max-w-full max-h-full object-contain" 
            />
          </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;