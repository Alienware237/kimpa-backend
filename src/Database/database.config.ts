import * as dotenv from 'dotenv';
import {IDatabaseConfig} from "./Interfaces/dbConfig.interface";
import * as Process from "process";

dotenv.config()

export const databaseConfig: IDatabaseConfig = {
    development: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 8080,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        //urlDatabase: process.env.URLDATABASE,
    },
    test: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        //urlDatabase: process.env.URLDATABASE,
    },
    production: {
        dialect: 'mysql',
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        //urlDatabase: process.env.URLDATABASE,
    }
}