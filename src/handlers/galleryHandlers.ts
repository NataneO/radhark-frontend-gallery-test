;
import { uploadImageToSignedUrl, uploadSignedUrl, uploadUrlMetadata } from '@/services/uploadImage';


export async function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
) {
  const file = event.target.files?.[0];
  if (file) {
    console.log("File selected:", file.name);
    try {
      const signedUrl = await uploadSignedUrl(file)

      await uploadImageToSignedUrl(signedUrl, file)

     await uploadUrlMetadata(signedUrl)
      

    } catch (error) {
      console.error('Error during upload or save:', error);
    }
  }
}
  
export const handlePlusClick = (fileInputRef: React.RefObject<HTMLInputElement  | null>) => {
    fileInputRef?.current?.click();
};
  

 export const handleScroll = (
   containerRef: React.RefObject<HTMLDivElement | null>,
  nextPageToken: string | null,
  onLoadMore: () => void
) => {
  if (containerRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && nextPageToken) {
      onLoadMore();
    }
  }
};