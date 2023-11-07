"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_entity_1 = require("../Modells/product.entity");
const database_config_1 = require("./database.config");
const constants_1 = require("../core/constants");
const post_entity_1 = require("../Modells/post.entity");
const administrator_entity_1 = require("../Modells/administrator.entity");
const user_entity_1 = require("../Modells/user.entity");
const review_entity_1 = require("../Modells/review.entity");
const comment_entity_1 = require("../Modells/comment.entity");
const order_entity_1 = require("../Modells/order.entity");
const order_item_entity_1 = require("../Modells/order_item.entity");
const cart_entity_1 = require("../Modells/cart.entity");
const cart_item_entity_1 = require("../Modells/cart_item.entity");
exports.databaseProviders = [
    {
        provide: constants_1.SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case constants_1.DEVELOPMENT:
                    config = database_config_1.databaseConfig.development;
                    break;
                case constants_1.TEST:
                    config = database_config_1.databaseConfig.test;
                    break;
                case constants_1.PRODUCTION:
                    config = database_config_1.databaseConfig.production;
                    break;
                default:
                    config = database_config_1.databaseConfig.development;
            }
            const sequelize = new sequelize_typescript_1.Sequelize('by57ioggcxewlwhhlsgt', 'um5z8evficfjo3e0', 'JrsJ4DGTdHTc4x2qmpjx', { dialect: "mysql", host: 'by57ioggcxewlwhhlsgt-mysql.services.clever-cloud.com', port: 3306 });
            sequelize.addModels([post_entity_1.Post, administrator_entity_1.Administrator, user_entity_1.User, product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem, review_entity_1.Review, comment_entity_1.Comment, cart_entity_1.Cart, cart_item_entity_1.CartItem]);
            await sequelize.sync();
            return sequelize;
        }
    }
];
//# sourceMappingURL=database.providers.js.map