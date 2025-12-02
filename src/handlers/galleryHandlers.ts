import { uploadImageToSignedUrl, uploadSignedUrl, uploadUrlMetadata } from '@/services/uploadImage';
import { toast } from "sonner";
import { useGalleryStore } from "@/stores/galleryStore"; 


function createUniqueSlug(fileName: string): string {
    const sanitizedName = fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const timestamp = Date.now(); 
    return `${sanitizedName}-${timestamp}`;
}

export async function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  fileInputRef: React.RefObject<HTMLInputElement | null>, 
  onRefresh: () => void,
) {
  const file = event.target.files?.[0]; 
  
  if (file) {
    const uniqueSlug = createUniqueSlug(file.name); 
    const { addOptimisticItem, removeOptimisticItem } = useGalleryStore.getState();

    const tempBlobUrl = URL.createObjectURL(file);
    
    addOptimisticItem({
      url: tempBlobUrl, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      isOptimistic: true,
      tempId: uniqueSlug, 
    });

    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const signedUrl = await uploadSignedUrl(file);
        await uploadImageToSignedUrl(signedUrl, file); 
        await uploadUrlMetadata(signedUrl);
        resolve(null); 
      } catch (error) {
        removeOptimisticItem(uniqueSlug); 
        reject(error); 
      }
    }).then(() => {
        onRefresh(); 
    });

    toast.promise(uploadPromise, {
      loading: `Carregando ${file.name}...`,
      success: `${file.name} foi adicionado com sucesso! `,
      error: (err) => {
        return err instanceof Error ? `Falha ao carregar: ${err.message}` : "Falha ao carregar imagem. Tente novamente.";
      },
    });
  }
}

export const handlePlusClick = (fileInputRef: React.RefObject<HTMLInputElement  | null>) => {
    fileInputRef?.current?.click(); 
};