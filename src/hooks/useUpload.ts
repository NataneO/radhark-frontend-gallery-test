import { uploadImageToSignedUrl, uploadSignedUrl, postImageMetadata } from "@/services/uploadImage";


export async function useUpload(file: File) {
  const filename = file.name;
  const contentType = file.type;

  const { signedUrl } = await uploadSignedUrl(filename, contentType);

  await uploadImageToSignedUrl(signedUrl, file);

  await postImageMetadata(filename);
}
