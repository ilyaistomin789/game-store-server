import { IAccount } from '../../db/interfaces/account.interface';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import {
  generateAccessAndRefreshTokens,
  generateNewAccessAndRefreshTokens,
  getAndSaveRefreshToken,
} from '../../token/refreshToken';
import { NextFunction } from 'express';

const authenticateService = (next: NextFunction, account: { username: string; role: string }) => {
  try {
    return generateNewAccessAndRefreshTokens(account);
  } catch (e) {
    next(e);
  }
};

export default authenticateService;
