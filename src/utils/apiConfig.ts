
export const BEARER_TOKEN = process.env.NEXT_PUBLIC_API_BEARER_TOKEN;
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const LIST_IMAGES_ENDPOINT = `${BASE_URL}/api/v1/images`;

if (!BEARER_TOKEN || !BASE_URL) {
    console.error("ERROR: The variables NEXT_PUBLIC_API_BASE_URL and/or NEXT_PUBLIC_API_BEARER_TOKEN are not defined.");
}