import { IAccount } from '../../db/interfaces/account.interface';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import { getAndSaveRefreshToken } from '../../token/refreshToken';

const authenticateService = (account: IAccount) => {
  const accessToken = jwt.sign(account, JWT_SECRET, {
    expiresIn: 3600 * 24,
  }); //TODO data from account?, use refreshToken/generateAccessAndRefreshTokens()
  const refreshToken = getAndSaveRefreshToken();
  // TODO make some logic for refreshToken with token/RefreshToken.ts
  return { accessToken, refreshToken };
};

export default authenticateService;
