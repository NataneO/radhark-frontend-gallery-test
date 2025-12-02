import { BASE_URL, BEARER_TOKEN } from "@/utils/apiConfig";

export async function uploadSignedUrl( file: File) {
  
      const response = await fetch(`${BASE_URL}/api/v1/signed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ file_name: file.name, mimetype: file.type }),
      });

   if (!response.ok) {
        throw new Error(`Failed to obtain signed URL from API. Status: ${response.status}`);
   }
   const data = await response.json();
  const signedUrl = data.url;
   console.log('Signed url obtained:', signedUrl);
  return signedUrl
}

export async function uploadImageToSignedUrl(signedUrl: string, file: File) {
  const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload file to storage. Status: ${uploadResponse.status}`);
    
      }

  return uploadResponse
}


export async function uploadUrlMetadata(signedUrl: string) { 
   const saveResponse = await fetch(`${BASE_URL}/api/v1/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({ url: signedUrl.split("?")[0] }),
    });

  if (!saveResponse.ok) {
    throw new Error(`Failed to save image metadata. Status: ${saveResponse.status}`);
  }
  
  return saveResponse
}