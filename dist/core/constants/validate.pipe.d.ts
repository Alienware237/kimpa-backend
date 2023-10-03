import { ArgumentMetadata, ValidationPipe } from "@nestjs/common";
export declare class ValidatePipe extends ValidationPipe {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private handleError;
}
