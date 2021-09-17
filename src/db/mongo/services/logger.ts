import mongoose from 'mongoose';
import logger from '../../../logger';
const exec = mongoose.Query.prototype.exec;
import { NODE_ENV } from '../../../config/config';

(() => {
  if (NODE_ENV !== 'production') {
    mongoose.Query.prototype.exec = async function () {
      logger.debug(JSON.stringify({ collection: this.mongooseCollection.name, query: this.getQuery() }));
      // @ts-ignore
      return await exec.apply(this, arguments);
    };
  }
})();
