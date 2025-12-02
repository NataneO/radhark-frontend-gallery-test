import React from "react";
import { handleFileUpload, handlePlusClick } from "@/handlers/galleryHandlers";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm, FieldValues } from "react-hook-form"; 
import { cn } from "@/lib/utils";

interface UploadFileButtonProps {
  onUpload: () => void;
}

interface UploadFormValues extends FieldValues {
    file: FileList;
}

const UploadFileButton: React.FC<UploadFileButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, reset, trigger } = useForm<UploadFormValues>();

  const onSubmit = async (data: UploadFormValues) => {
      const file = data.file?.[0];
      if (!file) return; 

      const event = { 
        target: { 
          files: data.file,
        } as unknown as HTMLInputElement
      } as React.ChangeEvent<HTMLInputElement>;
      
      await handleFileUpload(event, fileInputRef, onUpload);
      
      reset();
  };

  const { ref: rhfRef, onChange: rhfOnChange, ...restOfRegister } = register("file", { required: true });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    rhfOnChange(event); 
    
    const isValid = await trigger("file"); 
    
    if (isValid) {
        handleSubmit(onSubmit)(); 
    }
  };


  return (
    <div className="flex justify-end p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-56 h-14 border-solid border-2 rounded-2xl",
            "text-white bg-cyan-600 border-cyan-600 shadow-lg",
            "hover:bg-cyan-700 hover:font-bold hover:border-cyan-700 transition-colors"
          )}
          type="button" 
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
          {...restOfRegister}
          onChange={handleFileSelect} 
          ref={(e) => {
            fileInputRef.current = e; 
            rhfRef(e); 
          }}
          style={{ display: 'none' }}
          accept="image/jpeg,image/png,image/gif,image/webp" 
        />
      </form>
    </div>
  );
};

export default UploadFileButton;