"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("../../Services/post/post.service");
const post_providers_1 = require("../../Providers/post.providers");
const post_controller_1 = require("../../Controllers/post/post.controller");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        providers: [post_service_1.PostService, ...post_providers_1.postProviders],
        controllers: [post_controller_1.PostController],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=post.module.js.map