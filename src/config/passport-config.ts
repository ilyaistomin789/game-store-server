import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { JWT_SECRET, DB } from './config';
import { IAccount } from '../db/interfaces/account.interface';
import { getModelForClass } from '@typegoose/typegoose';
import AccountMongo from '../db/mongo/models/account';
import AccountPostgres from '../db/postgres/entity/account';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
interface IOpts {
  jwtFromRequest: string;
  secretOrKey: string;
}
const initializePassport = (passport): void => {
  const opts: IOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  };
  const authenticateUserLocal = async (username, password, done) => {
    try {
      let account: IAccount;
      if (DB === 'mongo') {
        account = await getModelForClass(AccountMongo).findOne({ username });
      } else if (DB === 'pg') {
        account = await getConnection().getRepository(AccountPostgres).findOne({ username });
      }
      if (!account) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const result = await bcrypt.compare(password, account.password);
      if (result) {
        return done(null, account);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (e) {
      done(e, false);
    }
  };
  async function authenticateUserJwt(jwtPayload, done) {
    try {
      let account: IAccount;
      if (DB === 'mongo') {
        account = await getModelForClass(AccountMongo).findOne({ username: jwtPayload.username });
      } else if (DB === 'pg') {
        account = await getConnection().getRepository(AccountPostgres).findOne({ username: jwtPayload.username });
      }
      if (account) {
        done(null, account);
      } else {
        done(null, false);
      }
    } catch (e) {
      done(e);
    }
  }
  passport.use(new JwtStrategy(opts, authenticateUserJwt));
  passport.use(new LocalStrategy(authenticateUserLocal));
};

export default initializePassport;
