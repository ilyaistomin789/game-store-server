import randToken from 'rand-token';
import { JWT_SECRET } from '../config/config';
import jwt from 'jsonwebtoken';
export interface IRefreshToken {
  refreshToken: string;
}
export interface IToken {
  accessToken: string;
  refreshToken: string;
}
let refreshTokens: IRefreshToken[] = [];

const addRefreshToken = (refreshToken: IRefreshToken) => {
  refreshTokens.push(refreshToken);
};

const removeRefreshToken = (refreshToken: IRefreshToken) => {
  refreshTokens = refreshTokens.filter((tk) => tk.refreshToken !== refreshToken.refreshToken);
};

const showRefreshTokens = () => {
  console.log(refreshTokens);
};

const getAndSaveRefreshToken = (): string => {
  const refreshToken = randToken.uid(256);
  addRefreshToken({ refreshToken });
  return refreshToken;
};
const findRefreshToken = (refreshToken: IRefreshToken): Boolean => {
  return refreshTokens.some((tk) => tk.refreshToken === refreshToken.refreshToken);
};
const getNewAccessAndRefreshTokens = (account: { username: string; role: string }): IToken => {
  const accessToken = jwt.sign(account, JWT_SECRET, {
    expiresIn: 3600 * 24,
  });
  const refreshToken = getAndSaveRefreshToken();
  return { accessToken, refreshToken };
};
const generateNewAccessAndRefreshTokens = (account: { username: string; role: string }) => {
  return getNewAccessAndRefreshTokens(account);
};

const generateAccessAndRefreshTokens = (
  account: { username: string; role: string },
  refreshToken: IRefreshToken
): IToken => {
  if (!refreshToken) {
    throw new Error('Please enter a refresh token');
  }
  console.log(findRefreshToken(refreshToken));
  if (findRefreshToken(refreshToken)) {
    removeRefreshToken(refreshToken);
    return getNewAccessAndRefreshTokens(account);
  } else throw new Error('Wrong refresh token');
};

export {
  addRefreshToken,
  removeRefreshToken,
  showRefreshTokens,
  getAndSaveRefreshToken,
  findRefreshToken,
  generateAccessAndRefreshTokens,
  generateNewAccessAndRefreshTokens,
};
