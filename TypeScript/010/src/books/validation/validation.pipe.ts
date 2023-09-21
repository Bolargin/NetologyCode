import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(id: any, metadata: ArgumentMetadata) {
    console.log(`test ${id} - ${metadata}`);
    const regexExp = /^[0-9a-fA-F]{24}$/;
    if (!regexExp.test(id)) {
      throw new Error(`error ${id}`);
    }
    return { id };
  }
}
