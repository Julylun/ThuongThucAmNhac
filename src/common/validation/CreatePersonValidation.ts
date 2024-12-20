import { ArgumentMetadata, BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseData } from '../class.global';
import { HttpCode } from '../enum.global';

@Injectable()
export class CreatePersonValidation extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        // Xử lý lỗi và định dạng lại dữ liệu trả về
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));


        return new ResponseData<any>({data: null, statusCode: HttpCode.BAD_REQUEST, message: formattedErrors}) 
      },
    });
  }
}
