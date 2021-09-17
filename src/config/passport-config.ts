import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { JWT_SECRET, DB } from './config';
import { IUser } from '../db/interfaces/user.interface';
import { getModelForClass } from '@typegoose/typegoose';
import UserMongo from '../db/mongo/models/user';
import UserPostgres from '../entity/user';
import { getConnection } from 'typeorm';
import { compare } from 'bcrypt';
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
      let user: IUser;
      if (DB === 'mongo') {
        user = await getModelForClass(UserMongo).findOne({ username });
      } else if (DB === 'pg') {
        user = await getConnection().getRepository(UserPostgres).findOne({ username });
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const result = compare(password, user.password);
      if (result) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (e) {
      done(e, false);
    }
  };
  async function authenticateUserJwt(jwt_payload, done) {
    try {
      let user: IUser;
      if (DB === 'mongo') {
        user = await getModelForClass(UserMongo).findById(jwt_payload.id);
      } else if (DB === 'pg') {
        user = await getConnection().getRepository(UserPostgres).findOne(jwt_payload.id);
      }
      if (user) {
        done(null, user);
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
