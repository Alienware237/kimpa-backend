import { Sequelize } from 'sequelize-typescript';
import { Product} from "../Modells/product.entity";
import {databaseConfig} from "./database.config";
import {DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST} from "../core/constants";
import {Post} from "../Modells/post.entity";
import {Administrator} from "../Modells/administrator.entity";
import {User} from "../Modells/user.entity";
import {Review} from "../Modells/review.entity";
import {Comment} from "../Modells/comment.entity";
import {Order} from "../Modells/order.entity";
import {OrderItem} from "../Modells/order_item.entity";
import {Cart} from "../Modells/cart.entity";
import {CartItem} from "../Modells/cart_item.entity";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize('sql11651249', 'sql11651249', 'D6a7t7a7base$', {dialect: "mysql", host: 'sql11.freesqldatabase.com', port: 3306});
            sequelize.addModels([Post, Administrator, User, Product, Order, OrderItem, Review, Comment, Cart, CartItem]);
            await sequelize.sync();
            return sequelize;
        }
    }
]

