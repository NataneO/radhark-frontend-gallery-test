import React from 'react';
import { ImageModalProps } from "@/interfaces/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import formatDate from '@/utils/date';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; 


const ImageModal: React.FC<ImageModalProps> = ({ item, isOpen, onClose, onNext, onPrev }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false} 
        className="contain h-auto max-h-[90vh] w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[1200px] p-4 sm:p-6"
      >
          <DialogHeader className='flex-row items-center justify-between'>
            <DialogTitle className='text-lg font-semibold text-gray-700'>{formatDate(item.created_at)}</DialogTitle>
             
            <Button 
                onClick={onClose} 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 text-gray-500 hover:bg-gray-200 hover:text-red-500"
                title="Fechar (ESC)"
            >
                <X className="w-5 h-5" />
                <span className="sr-only">Fechar</span>
            </Button>
          </DialogHeader>
        
        
          <div className="relative flex items-center justify-center flex-grow py-4">
         
             <Button
                onClick={onPrev}
                variant="ghost"
                size="icon-lg"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100 hover:bg-gray-200/50"
                title="Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-8 h-8 text-cyan-700" />
                <span className="sr-only">Anterior</span>
              </Button>

              
              <img 
                src={item.url} 
                alt="Imagem Selecionada" 
                className="max-w-full max-h-[calc(90vh-100px)] w-auto h-auto object-contain shadow-xl rounded-lg" 
              />
              
              <Button 
                onClick={onNext} 
                variant="ghost" 
                size="icon-lg" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100 hover:bg-gray-200/50"
                title="Próxima (Seta Direita)"
              >
                <ChevronRight className="w-8 h-8 text-cyan-700" />
                <span className="sr-only">Próxima</span>
              </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;