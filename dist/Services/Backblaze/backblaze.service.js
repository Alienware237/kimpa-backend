"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackblazeService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const B2 = require('backblaze-b2');
let BackblazeService = class BackblazeService {
    constructor() {
        this.b2 = new B2({
            applicationKeyId: '005d73149ba49010000000002',
            applicationKey: 'K005Vj65XV5l1ov23IvSpI4Kwv7cHCc'
        });
        const accountId = '005d73149ba49010000000002';
        const applicationKey = 'K005Vj65XV5l1ov23IvSpI4Kwv7cHCc';
    }
    async createBucket(bucketName) {
        try {
            await this.b2.createBucket({
                bucketName: bucketName,
                bucketType: 'allPublic'
            });
        }
        catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }
    async uploadFile(bucketName, files) {
        let images = [];
        if (files.length > 0) {
            for (const file of files) {
                try {
                    if (!file || !file.path) {
                        console.error('Invalid file data.');
                        null;
                    }
                    if (!file.originalname) {
                        console.error('Invalid file name.');
                        null;
                    }
                    const fileName = file.filename;
                    console.log('Uploading file with name:', fileName);
                    await this.b2.authorize();
                    const response = await this.b2.getUploadUrl({
                        bucketId: '5dc7b32194c91baa84b90011',
                    });
                    console.log('getUploadUrl:', response);
                    const fileData = fs.readFileSync(file.path);
                    const uploadResponse = await this.b2.uploadFile({
                        uploadUrl: response.data.uploadUrl,
                        uploadAuthToken: response.data.authorizationToken,
                        fileName: fileName,
                        data: fileData,
                    });
                    const fileId = uploadResponse.data.fileId;
                    console.log('File uploaded:', fileId);
                    const downloadResponse = await this.b2.downloadFileByName({
                        bucketName: bucketName,
                        fileName: fileName,
                        responseType: 'arraybuffer',
                    });
                    const permanentUrl = downloadResponse.request.res.responseUrl;
                    console.log('Permanent URL:', permanentUrl);
                    images.push(permanentUrl);
                }
                catch (error) {
                    console.error('Error uploading file:', error);
                    throw error;
                }
            }
        }
        return images;
    }
    async downloadFile(bucketName, fileId) {
        try {
            const { data } = await this.b2.downloadFileByName({
                bucketName: bucketName,
                fileName: fileId,
                responseType: undefined
            });
            return data;
        }
        catch (error) {
            console.error('Error downloading file:', error);
            throw error;
        }
    }
};
BackblazeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BackblazeService);
exports.BackblazeService = BackblazeService;
//# sourceMappingURL=backblaze.service.js.map