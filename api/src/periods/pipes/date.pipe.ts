import { PipeTransform } from '@nestjs/common';

export class DatePipe implements PipeTransform {
  transform({ started_at, ended_at, ...props }: any) {
    return {
      ...props,
      started_at: new Date(started_at).toISOString(),
      ended_at: new Date(ended_at).toISOString(),
    };
  }
}
