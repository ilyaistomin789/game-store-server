import { findRefreshToken, generateAccessAndRefreshTokens, IRefreshToken } from '../../token/refreshToken';
import { NextFunction, Request, Response } from 'express';

const refreshTokenService = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const accessAndRefreshTokens = generateAccessAndRefreshTokens(refreshToken);
    res.json(accessAndRefreshTokens);
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default refreshTokenService;
