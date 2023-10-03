"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProviders = void 0;
const post_entity_1 = require("../Modells/post.entity");
const constants_1 = require("../core/constants");
exports.postProviders = [{
        provide: constants_1.POST_REPOSITORY,
        useValue: post_entity_1.Post,
    }];
//# sourceMappingURL=post.providers.js.map