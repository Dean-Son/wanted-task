import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
@Injectable()
export class DateHelper {
  getFormatDate(date = '', format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(date).format(format);
  }
}
