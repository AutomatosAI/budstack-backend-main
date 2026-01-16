import { Injectable } from "@nestjs/common";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3UploadService {
  private bucket: string;
  private readonly s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(private configService: ConfigService) {
    this.bucket = process.env.AWS_BUCKET_NAME;
  }

  async uploadImage(mimeType: string, keyName: string, file: Buffer) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: `${keyName}`,
          Body: file,
          ContentType: mimeType,
          ACL: "public-read",
        })
      );
      const imageUrl = `https://${this.bucket}.s3.amazonaws.com/${keyName}`;
      return { url: imageUrl };
    } catch (error) {
      throw error;
    }
  }
}
