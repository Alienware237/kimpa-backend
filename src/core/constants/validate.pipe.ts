import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    UnprocessableEntityException,
    ValidationPipe
} from "@nestjs/common";


@Injectable()
export class ValidatePipe extends ValidationPipe {
    public async transform(value, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        }catch (e) {
            if (e instanceof BadRequestException) {
                throw new UnprocessableEntityException(this.handleError(e.message));
            }
        }
    }
    private handleError(errors) {
        if (Array.isArray(errors)) {
            return errors.map(error => error.constraints);
        } else if (errors && typeof errors === 'object') {
            return [errors];
        }
        return [];
    }
}