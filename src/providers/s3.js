import fetch from "node-fetch"
import { generatePresignedUrl } from "../utils/s3_presigned_urls";


export async function fetchConfig({ bucket, key, region, token }) {
  try {
    const presignedUrl = await generatePresignedUrl({ bucket, key, region });

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(presignedUrl, { headers });
    if (!res.ok) throw new Error(`S3: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch from S3: ${err.message}`);
  }
}