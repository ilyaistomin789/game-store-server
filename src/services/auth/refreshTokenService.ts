import { findRefreshToken, generateAccessAndRefreshTokens, IRefreshToken } from '../../token/refreshToken';
import { NextFunction, Request, Response } from 'express';

const refreshTokenService = (request: Request, response: Response, next: NextFunction) => {
  try {
    const { username, role, refreshToken } = request.body;
    const accessAndRefreshTokens = generateAccessAndRefreshTokens({ username, role }, { refreshToken });
    response.json(accessAndRefreshTokens);
  } catch (e) {
    response.status(400);
    next(e);
  }
};
export default refreshTokenService;
