import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

export const run = async (): Promise<void> => {
  try {
    await connect(process.env.MONGODB_CONNECTION as string).then(() => {
      console.log('Database is running');
    });
  } catch (err) {
    console.error(err);
  }
};
