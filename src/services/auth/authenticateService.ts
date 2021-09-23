import { IAccount } from '../../db/interfaces/account.interface';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import {
  generateAccessAndRefreshTokens,
  generateNewAccessAndRefreshTokens,
  getAndSaveRefreshToken,
} from '../../token/refreshToken';
import { NextFunction, Request, Response } from 'express';

const authenticateService = (next: NextFunction, username: string) => {
  try {
    return generateNewAccessAndRefreshTokens(username);
  } catch (e) {
    next(e);
  }
};

export default authenticateService;
