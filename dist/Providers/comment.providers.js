"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentProviders = void 0;
const comment_entity_1 = require("../Modells/comment.entity");
exports.commentProviders = [{
        provide: 'COMMENT_REPOSITORY',
        useValue: comment_entity_1.Comment,
    }];
//# sourceMappingURL=comment.providers.js.map