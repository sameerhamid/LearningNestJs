import { BadGatewayException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (result.success) {
      return result.data;
    }
    throw new BadGatewayException(result.error.format());
  }
}
