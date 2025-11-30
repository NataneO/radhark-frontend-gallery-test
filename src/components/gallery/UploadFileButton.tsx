import { handleFileUpload, handlePlusClick } from "@/handlers/galleryHandlers";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";

const UploadFileButton: React.FC = () => {
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Button
        variant="outline"
        className="w-50 h-50 flex-shrink-0 border-dashed border-2 text-gray-500 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
        onClick={() => {
          if (fileInputRef.current) {
            handlePlusClick(fileInputRef);
          }
        }}
      >
        <Plus className="w-5 h-5" />
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
    </>
  )
};

export default UploadFileButton;