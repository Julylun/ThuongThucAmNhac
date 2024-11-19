import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class ParseFormDataToStringPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'object') {
      throw new BadRequestException('Invalid form data');
    }

    const result = {};
    for (const key in value) {
      result[key] = String(value[key]); 
      Logger.log(result[key])
    }

    return result;
  }
}
