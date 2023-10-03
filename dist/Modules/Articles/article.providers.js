"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleProviders = void 0;
const article_entity_1 = require("../../Modells/article.entity");
exports.articleProviders = [
    {
        provide: 'ARTICLE_REPOSITORY',
        useValue: article_entity_1.Article,
    },
];
//# sourceMappingURL=article.providers.js.map