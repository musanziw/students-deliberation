import { SetMetadata } from '@nestjs/common';
import * as process from 'process';

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
