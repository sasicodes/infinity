import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { Context } from "hono";
import { v4 as uuidv4 } from "uuid";

const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;

const R2_ENDPOINT =
  "https://8c096dfa36dc8fff1771c356915965a3.r2.cloudflarestorage.com";
const R2_BUCKET_NAME = "infinity";

const client = new S3({
  endpoint: R2_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: R2_SECRET_ACCESS_KEY ?? ""
  },
  maxAttempts: 10
});

export const upload = async (c: Context) => {
  try {
    const fileKey = uuidv4();
    const file = (await c.req.formData()).get("file") as unknown as File;
    if (!file) {
      return c.json({
        success: false,
        message: "No file uploaded"
      });
    }
    const params: PutObjectCommandInput = {
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
      Body: file,
      ContentType: file.type
    };
    const task = new Upload({
      client,
      params,
      queueSize: 10,
      partSize: 10 * 1024 * 1024
    });
    await task.done();
    return c.json({
      success: true,
      url: `https://r2.tape.xyz/${fileKey}`,
      type: file.type
    });
  } catch (error) {
    console.error("[Upload] Error:", error);
    return c.json({
      success: false,
      message: "Failed to upload file"
    });
  }
};
