import { handleFileUpload, handlePlusClick } from "@/handlers/galleryHandlers";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";

const UploadFileButton: React.FC = () => {
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex justify-end">
      <Button
        variant="outline"
        className="w-50 h-16 my-4 flex-shrink-0 border-solid border-2 rounded-3xl text-gray-50 bg-cyan-600 hover:bg-cyan-700 hover:font-bold hover:border-cyan-600 transition-colors"
        onClick={() => {
          if (fileInputRef.current) {
            handlePlusClick(fileInputRef);
          }
        }}
      >
        <Plus className="w-5 h-5" /> <>Adicionar arquivo</>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(event) => {
          if (fileInputRef.current) {
            handleFileUpload(event, fileInputRef);
          }
        }}
      />
    </div>
  )
};

export default UploadFileButton;