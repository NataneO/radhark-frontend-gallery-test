import { BASE_URL, BEARER_TOKEN } from "@/utils/apiConfig";
import { toast } from "sonner";


export async function uploadSignedUrl( file: File// PASSO 1
) {
  
      const response = await fetch(`${BASE_URL}/api/v1/signed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ file_name: file.name, mimetype: file.type }),
      });

   if (!response.ok) {
          throw new Error('Failed to upload file');
   }
   const data = await response.json();
  const signedUrl = data.url;
   console.log('Signed url obtained:', signedUrl);
  return signedUrl
}

export async function uploadImageToSignedUrl(signedUrl: string, file: File) {//PASSO 2
  const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    toast("Faha ao salvar imagem. Tente novamente mais tarde.")
    throw new Error('Failed to save image');
    
      }

  

  return uploadResponse
}


export async function uploadUrlMetadata(signedUrl: string) { // PASSO 3
   const saveResponse = await fetch(`${BASE_URL}/api/v1/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({ url: signedUrl.split("?")[0] }),
    });
toast("Imagem adicionada com sucesso.")
  
  return saveResponse
}

