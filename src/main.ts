import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePipe } from "./core/constants/validate.pipe";
import * as express from 'express'
import {ExpressAdapter} from "@nestjs/platform-express";
import * as dotenv from 'dotenv';
import {ElasticsearchIndexingService} from "./Services/elasticsearch/elasticsearch.service";
import * as sessions from "express-session";
import * as cookieParser from "cookie-parser";

async function bootstrap() {

    const server = express();
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api/for/le')
  app.useGlobalPipes(new ValidatePipe());

  // Configure CORS to allow requests from your Angular app's origin
  app.enableCors({
    origin: 'https://kimpa-africa-online-shop.onrender.com', // Replace with your Angular app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable sending cookies in cross-origin requests (if needed)
  });

  // Increase the payload size limit to 10MB
  app.use(express.json({ limit: '10mb' }));

  const indexingService = app.get(ElasticsearchIndexingService);
  await indexingService.fetchAllProduct();

  // Configure cookie parsing middleware
  app.use(cookieParser());

  await app.listen(3002);
}
bootstrap();
