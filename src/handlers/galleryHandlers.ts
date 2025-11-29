// 'galleryHandlers.ts'
import { BASE_URL, BEARER_TOKEN } from '@/utils/apiConfig';


export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  uploadFileToSignedUrl: (signedUrl: string, file: File) => Promise<void>
) => {
  const file = event.target.files?.[0];
  if (file) {
    console.log("File selected:", file.name);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/signed`, {
        method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
        body: JSON.stringify({ file_name: file.name, mimetype: file.type }),
    });

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
    }

      const data = await response.json();
      const signedUrl = data.url;
      console.log('Signed url obtained:', signedUrl);
      await uploadFileToSignedUrl(signedUrl, file);
      console.log("File uploaded successfully");
  } catch (error) {
      console.error("Error uploading file:", error);
  }
}
};

  
export const handlePlusClick = (fileInputRef: React.RefObject<HTMLInputElement  | null>) => {
    fileInputRef?.current?.click();
};
  
