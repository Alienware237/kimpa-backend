"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewProviders = void 0;
const review_entity_1 = require("../Modells/review.entity");
exports.reviewProviders = [
    {
        provide: 'REVIEW_REPOSITORY',
        useValue: review_entity_1.Review,
    },
];
//# sourceMappingURL=review.providers.js.map