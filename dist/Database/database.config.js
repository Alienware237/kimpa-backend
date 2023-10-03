"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.databaseConfig = {
    development: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 8080,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    test: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    production: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
};
//# sourceMappingURL=database.config.js.map