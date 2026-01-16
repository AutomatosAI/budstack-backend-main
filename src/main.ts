import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { CONSTANT } from "./constants";
import { ConfigService } from "@nestjs/config";
import { configData } from "./config";

async function bootstrap() {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  const configService = app.get(ConfigService);
  //swagger setup
  const config = new DocumentBuilder()
    .setTitle("Dr.Green Backend")
    .setDescription("API Documentation")
    .setVersion("1.0")
    .build();
  app.setGlobalPrefix(CONSTANT.PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    })
  );
  // Initialize Firebase only if valid credentials are provided
  const firebasePrivateKey = configService.get(CONSTANT.FIREBASE.PRIVATE_KEY);
  if (firebasePrivateKey && !firebasePrivateKey.includes('MOCK')) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: configService.get(CONSTANT.FIREBASE.CLIENT_EMAIL),
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
        projectId: configService.get(CONSTANT.FIREBASE.PROJECT_ID),
      }),
    });
  } else {
    console.log('Firebase initialization skipped (mock credentials detected)');
  }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({
    origin: [
      "https://admin.drgreennft.com",
      "https://marketplace.drgreennft.com",
      "https://dapp.drgreennft.com",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:5171",
      "http://localhost:5172",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
