"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validate_pipe_1 = require("./core/constants/validate.pipe");
const express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const dotenv = require("dotenv");
const elasticsearch_service_1 = require("./Services/elasticsearch/elasticsearch.service");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    let session;
    const server = express();
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.setGlobalPrefix('api/for/le');
    app.useGlobalPipes(new validate_pipe_1.ValidatePipe());
    app.enableCors();
    app.use(express.json({ limit: '10mb' }));
    const indexingService = app.get(elasticsearch_service_1.ElasticsearchIndexingService);
    await indexingService.fetchAllProduct();
    app.use(cookieParser());
    app.use(sessions({
        secret: 'Kimpa-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 20 },
    }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map