import { Module } from "@nestjs/common";
import { S3UploadService } from "./s3Upload.service";
import { S3UploadController } from "./s3Upload.controller";

@Module({
  imports: [],
  controllers: [S3UploadController],
  providers: [S3UploadService],
})
export class S3UploadModule {}
