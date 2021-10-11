import randToken from 'rand-token';
import { JWT_SECRET } from '../config/config';
import jwt from 'jsonwebtoken';
export interface IRefreshToken {
  username: string;
  refreshToken: string;
}
export interface IToken {
  accessToken: string;
  refreshToken: string;
}
let refreshTokens: IRefreshToken[] = [];

const addRefreshToken = (data: IRefreshToken) => {
  refreshTokens.push(data);
};

const removeRefreshToken = (refreshToken: string) => {
  refreshTokens = refreshTokens.filter((tk) => tk.refreshToken !== refreshToken);
};

const showRefreshTokens = () => {
  console.log(refreshTokens);
};

const getAndSaveRefreshToken = (username: string): string => {
  const refreshToken = randToken.uid(256);
  addRefreshToken({ username, refreshToken });
  return refreshToken;
};
const findRefreshToken = (refreshToken: string): Boolean => {
  return refreshTokens.some((tk) => tk.refreshToken === refreshToken);
};
const getNewAccessAndRefreshTokens = (username: string): IToken => {
  const accessToken = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: 3600 * 24,
  });
  const refreshToken = getAndSaveRefreshToken(username);
  return { accessToken, refreshToken };
};
const generateNewAccessAndRefreshTokens = (username: string) => {
  return getNewAccessAndRefreshTokens(username);
};
const getUsernameUsingToken = (refreshToken: string) => {
  return refreshTokens.find((tk) => tk.refreshToken === refreshToken).username;
};
const generateAccessAndRefreshTokens = (refreshToken: string): IToken => {
  if (!refreshToken) {
    throw new Error('Please enter a refresh token');
  }
  if (findRefreshToken(refreshToken)) {
    const username = getUsernameUsingToken(refreshToken);
    removeRefreshToken(refreshToken);
    return getNewAccessAndRefreshTokens(username);
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
