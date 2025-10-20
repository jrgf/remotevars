import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generatePresignedUrl({
  bucket,
  key,
  region = "us-east-1",
}) {
  const s3 = new S3Client({ region });

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });


  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
}
