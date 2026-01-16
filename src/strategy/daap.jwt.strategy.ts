import {
  BadRequestException,
  Body,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import * as formidable from "formidable";
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import { Role } from "@prisma/client";
import { MESSAGES } from "src/constants";

@Injectable()
export class DualAuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwtToken = this.getJwtToken(req);
    const clientKey = this.getClientKey(req);
    // console.log("Client key::", clientKey, "jwt token::", jwtToken,"::::::", req.body);

    if (jwtToken || typeof jwtToken === "string") {
      const token = req.headers.authorization.split(" ")[1];
      try {
        // Verify JWT token
        const decodedToken = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET_LOGIN,
        });
        const { id } = decodedToken;
        const user: any = await this.prisma.user.findFirst({
          where: {
            id,
            primaryNftId: { not: null },
          },
          select: {
            id: true,
            walletAddress: true,
            email: true,
            role: true,
            nft: true,
            primaryNftId: true,
          },
        });

        if (!user) {
          throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
        }
        if (!user.primaryNftId) {
          user.primaryNftId = user.nft[0].id;
        }
        req["user"] = {
          userId: id,
          role: user.role,
          primaryNftId: user.primaryNftId,
        };
        return true;
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new BadRequestException("Oops!, your session is expired");
        }
        if (error.name === "JsonWebTokenError") {
          throw new UnauthorizedException("Oops!, you need to login first");
        }
        throw new BadRequestException(MESSAGES.ERROR.AUTHORIZATION.NOT_FOUND);
      }
    } // Verify the payload using the public key and signature
    else if (
      clientKey.apiKey &&
      clientKey.signature &&
      (await this.verifyPayload(clientKey.apiKey, clientKey.signature, req))
    ) {
      const userAPI = await this.prisma.apiKey.findUnique({
        where: { key: clientKey.apiKey },
      });
      const user: any = await this.prisma.user.findFirst({
        where: {
          id: userAPI.userId,
          primaryNftId: { not: null },
        },
        select: {
          id: true,
          walletAddress: true,
          email: true,
          role: true,
          nft: true,
          primaryNftId: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
      }
      if (!user.primaryNftId) {
        user.primaryNftId = user.nft[0].id;
      }
      req["user"] = {
        userId: userAPI.userId,
        role: user.role,
        primaryNftId: user.primaryNftId,
      };
      return true;
    } else {
      throw new UnauthorizedException("User is not authorized");
    }
  }

  async apiKeyAuth(request: Request) {
    const apiKey = request.headers["x-auth-apikey"] as string;
    const signature = request.headers["x-auth-signature"] as string;
    const payload = request.body;

    // Verify the payload using the public key and signature
    if (
      apiKey &&
      signature &&
      (await this.verifyPayload(apiKey, signature, payload))
    ) {
      const userAPI = await this.prisma.apiKey.findUnique({
        where: { key: apiKey },
      });
      const user: any = await this.prisma.user.findFirst({
        where: {
          id: userAPI.userId,
          primaryNftId: { not: null },
        },
        select: {
          id: true,
          walletAddress: true,
          email: true,
          role: true,
          nft: true,
          primaryNftId: true,
        },
      });
      request["user"] = {
        userId: userAPI.userId,
        role: user.role,
        primaryNftId: user.primaryNftId,
      };
      return true;
    } else {
      throw new UnauthorizedException("You are Unauthorized");
    }
  }

  async verifyPayload(
    apiKey: string,
    signature: string,
    req: any
  ): Promise<boolean> {
    try {
      let data: string;
      // const signatureBuffer = Buffer.from(signature, "base64");
      // const publicKeyBuffer = Buffer.from(apiKey, "base64");
      // const publicKey = crypto.createPublicKey(publicKeyBuffer);

      const contentType = req.headers["content-type"];

      if (contentType && contentType.includes("multipart/form-data")) {
        const form = new formidable.IncomingForm();
        const formData = {}; // To store both fields and files
        const formParsePromise = new Promise((resolve, reject) => {
          form.parse(req, async (err, fields, files) => {
            if (err) {
              // Handle parsing error
              console.error("Error parsing FormData:", err);
              // return res.status(500).send('Internal Server Error');
            }

            // Access form fields
            for (const fieldName of Object.keys(fields)) {
              const element = fields[fieldName];
              formData[fieldName] = element[0];
            }
            // set body fields
            req.body = { ...req.body, ...formData };

            // access form files
            for (const fieldName of Object.keys(files)) {
              const file = files[fieldName];
              try {
                // Read the file content into a buffer
                const fileBuffer = await fs.promises.readFile(file[0].filepath);

                // Capture file buffer
                formData[fieldName] = fileBuffer;

                // store the file content in request files
                req.files = {
                  fieldname: fieldName,
                  originalname: file[0].originalFilename,
                  mimetype: file[0].mimetype,
                  buffer: fileBuffer,
                  size: file[0].size,
                };
              } catch (err) {
                console.error("Error reading file or combining buffers:", err);
              }
            }
            resolve(formData);
          });
        });
        await formParsePromise;
        const dapp = await this.prisma.apiKey.findFirst({
          where: { key: apiKey, isDelete: false },
        });
        if (!dapp) {
          return false;
        }
        data = JSON.stringify(formData);
      } else {
        const dapp = await this.prisma.apiKey.findFirst({
          where: { key: apiKey, isDelete: false },
        });
        if (!dapp) {
          return false;
        }
        if (req.method === "GET") {
          if (req.query && Object.keys(req.query).length !== 0) {
            data = new URLSearchParams(
              req.query as Record<string, string>
            ).toString();
          } else {
            data = JSON.stringify(req.params);
          }
        } else {
          data = JSON.stringify(req.body);
        }
      }
      console.log("data:::", data, " :::::", apiKey, "::::", signature);
      const verified = this.verifySignature(data, signature, apiKey);

      // const verified = crypto.verify(
      //   null,
      //   Buffer.from(data),
      //   publicKey,
      //   signatureBuffer
      // );

      console.log("verified::::", verified);
      if (verified) {
        return true;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  private verifySignature(
    message: string,
    signature: string,
    apiKey: string
  ): boolean {
    const publicKeyPEM = Buffer.from(apiKey, "base64").toString("utf-8");

    const verifier = crypto.createVerify("SHA256");
    verifier.update(message);
    verifier.end();

    return verifier.verify(publicKeyPEM, Buffer.from(signature, "base64"));
  }

  private getJwtToken(req: Request) {
    return req.headers.authorization ? req.headers.authorization : null;
  }

  private getClientKey(req) {
    const apiKey = req.headers["x-auth-apikey"] || null;
    const signature = req.headers["x-auth-signature"] || null;
    return { apiKey, signature };
  }
}
