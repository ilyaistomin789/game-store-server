//TODO create class with array, make static method where we can generate refresh token and destroy it when we will get new access token
import randToken from 'rand-token';
import { JWT_SECRET } from '../config/config';
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

const generateAccessAndRefreshTokens = (): IToken => {
  const accessToken = jwt.sign(account, JWT_SECRET, {
    //TODO account??
    expiresIn: 3600 * 24,
  });
  const refreshToken = getAndSaveRefreshToken();
};

export { addRefreshToken, removeRefreshToken, showRefreshTokens, getAndSaveRefreshToken, findRefreshToken };
