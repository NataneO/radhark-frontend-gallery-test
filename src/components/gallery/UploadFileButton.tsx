import { handleFileUpload, handlePlusClick } from "@/handlers/galleryHandlers";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";
import React from "react"; 

interface UploadFileButtonProps {
  onUpload: () => void;
}
const UploadFileButton: React.FC<UploadFileButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current) {
      handleFileUpload(event, fileInputRef, onUpload);
    }
  };

  return (
    <div className="flex justify-end p-4">
      <Button
        variant="outline"
        size="lg"
        className="w-56 h-14 border-solid border-2 rounded-2xl 
                   text-white bg-cyan-600 border-cyan-600 shadow-lg
                   hover:bg-cyan-700 hover:font-bold hover:border-cyan-700
                   transition-colors"
        onClick={() => {
          if (fileInputRef.current) {
            handlePlusClick(fileInputRef);
          }
        }}
        title="Adicionar novo arquivo de imagem"
      >
        <Plus className="w-5 h-5" /> Adicionar arquivo
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onChangeHandler}
        accept="image/jpeg,image/png,image/gif,image/webp" 
      />
    </div>
  );
};

export default UploadFileButton;