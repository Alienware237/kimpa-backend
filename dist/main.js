"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validate_pipe_1 = require("./core/constants/validate.pipe");
const express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const dotenv = require("dotenv");
const product_service_1 = require("./Services/product/product.service");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const server = express();
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.setGlobalPrefix('api/for/le');
    app.useGlobalPipes(new validate_pipe_1.ValidatePipe());
    app.enableCors();
    app.use(express.json({ limit: '10mb' }));
    const fetchProduct = app.get(product_service_1.ProductService);
    app.use(cookieParser());
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map