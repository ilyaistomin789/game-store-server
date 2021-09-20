import { findRefreshToken, IRefreshToken } from '../../token/refreshToken';
import { NextFunction, Request, Response } from 'express';

const refreshTokenService = (request: Request, response: Response, next: NextFunction) => {
  const { refreshToken } = request.body;
  if (findRefreshToken(refreshToken)) {
    //TODO continue
  }
};
export default refreshTokenService;
