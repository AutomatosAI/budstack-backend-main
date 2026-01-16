// s3.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3UploadService } from "./s3Upload.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { v4 as uuidv4 } from 'uuid';
import { Role } from "@prisma/client";
import { RoleGuard } from "src/guard/roles.guard";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("S3")
@Controller("s3")
export class S3UploadController {
  constructor(private readonly s3UploadService: S3UploadService) {}

  @Post("upload")
  @ApiResponse({
    status: 201,
    description: "file upload to S3",
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ url: string }> {
    return await this.s3UploadService.uploadImage(
      file.mimetype,
      `${uuidv4()}-${file.originalname}`,
      file.buffer
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN]))
  @Post("/strains/upload")
  @ApiResponse({
    status: 201,
    description: "file upload to S3",
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadStrainFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ url: string }> {
    
    return await this.s3UploadService.uploadImage(
      file.mimetype,
      `dr-green-strains/${file.originalname}`,
      file.buffer
    );
  }
}
