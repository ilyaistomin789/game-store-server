import { createLogger } from 'winston';
import { winstonConfig } from './config';
export const logger = createLogger(winstonConfig);
