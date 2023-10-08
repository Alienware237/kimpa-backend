import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePipe } from "./core/constants/validate.pipe";
import * as express from 'express'
import {ExpressAdapter} from "@nestjs/platform-express";
import * as dotenv from 'dotenv';
import {ProductService} from "./Services/product/product.service";
import * as sessions from "express-session";
import * as cookieParser from "cookie-parser";

async function bootstrap() {

    const server = express();
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api/for/le')
  app.useGlobalPipes(new ValidatePipe());

  // Configure CORS to allow requests from your Angular app's origin
  // Set up CORS
  app.enableCors();

  // Increase the payload size limit to 10MB
  app.use(express.json({ limit: '10mb' }));

  const fetchProduct = app.get(ProductService);
  //await fetchProduct.fetchAll();

  // Configure cookie parsing middleware
  app.use(cookieParser());

  await app.listen(3002);
}
bootstrap();
