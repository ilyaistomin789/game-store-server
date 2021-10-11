import { createLogger } from 'winston';
import { winstonConfig } from './config/config';
const logger = createLogger(winstonConfig);
export default logger;
