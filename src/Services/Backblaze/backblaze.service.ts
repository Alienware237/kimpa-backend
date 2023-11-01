// backblaze.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as url from "url";

const B2 = require('backblaze-b2');
@Injectable()
export class BackblazeService {
    private readonly b2 = new B2({
        applicationKeyId: '005d73149ba49010000000002',
        applicationKey: 'K005Vj65XV5l1ov23IvSpI4Kwv7cHCc'
    }); // Initialize the Backblaze B2 client

    constructor() {
        const accountId = '005d73149ba49010000000002';
        const applicationKey = 'K005Vj65XV5l1ov23IvSpI4Kwv7cHCc';
    }

    async createBucket(bucketName: string): Promise<void> {
        // Create a new bucket
        try {
            await this.b2.createBucket({
                bucketName: bucketName,
                bucketType: 'allPublic'// Adjust as needed
            });
        } catch (error) {
            // Handle errors
            console.error('Error creating bucket:', error);
            throw error;
        }
    }

    async uploadFile(bucketName: string, file: Express.Multer.File): Promise<string | null> {
        try {
            if (!file || !file.path) {
                console.error('Invalid file data.');
                return null;
            }

            if (!file.originalname) {
                console.error('Invalid file name.');
                return null;
            }

            const fileName = `${Date.now()}${file.originalname}`;
            console.log('Uploading file with name:', fileName);

            await this.b2.authorize();

            const response = await this.b2.getUploadUrl({
                bucketId: '5dc7b32194c91baa84b90011', // Replace with your bucket ID
                // ...other optional arguments
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

            // Now, store the fileId in your database for future reference
            // ...

            // Return the permanent URL for the uploaded file
            const downloadResponse = await this.b2.downloadFileByName({
                bucketName: bucketName,
                fileName: fileName,
                responseType: 'arraybuffer', // Choose the desired response type
            });

            const permanentUrl = downloadResponse.request.res.responseUrl;

            console.log('Permanent URL:', permanentUrl);
            return permanentUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }


    async downloadFile(bucketName: string, fileId: string): Promise<Buffer> {
        // Download a file from the specified bucket
        try {
            const { data } = await this.b2.downloadFileByName({
                bucketName: bucketName,
                fileName: fileId,
                responseType: undefined
            });

            return data;
        } catch (error) {
            // Handle errors
            console.error('Error downloading file:', error);
            throw error;
        }
    }
}
