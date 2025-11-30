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


export const handleScroll = (nextPageToken: string | null, loadNextPage: () => void) => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight && nextPageToken) {
    loadNextPage();
  }
};