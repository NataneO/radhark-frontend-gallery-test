import { handleFileUpload, handlePlusClick } from "@/handlers/galleryHandlers";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";

interface UploadFileButtonProps {
  onUpload: () => void;
}
const UploadFileButton: React.FC<UploadFileButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex justify-end">
      <Button
        variant="outline"
        className="w-50 h-16 my-4  border-solid border-2 rounded-3xl text-gray-50 bg-cyan-600 hover:bg-cyan-700 hover:font-bold"
        onClick={() => {
          if (fileInputRef.current) {
            handlePlusClick(fileInputRef);
          }
        }}
      >
        <Plus className="w-5 h-5" /> Adicionar 
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={async (event) => {
          if (fileInputRef.current) {
            await handleFileUpload(event, fileInputRef);
            onUpload();
          }
        }}
      />
    </div>
  );
};

export default UploadFileButton;