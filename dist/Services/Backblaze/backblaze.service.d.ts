/// <reference types="multer" />
/// <reference types="node" />
export declare class BackblazeService {
    private readonly b2;
    constructor();
    createBucket(bucketName: string): Promise<void>;
    uploadFile(bucketName: string, files: Array<Express.Multer.File>): Promise<string[] | null>;
    downloadFile(bucketName: string, fileId: string): Promise<Buffer>;
}
