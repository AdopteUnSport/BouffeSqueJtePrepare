
import { Request } from 'express';
import {  IUser } from '../interface';
import TokenData from "../interface/tokenData.model";
import DataStoredInToken from "../interface/dataStoredInToken.model";
import * as jwt from 'jsonwebtoken';
import { TokenRepository } from "../repository/tokenRepository";
import { RefreshTokenRepository } from '../repository/refreshTokenRepository';
 class AuthService{
    private tokenRepository = new TokenRepository()
    private refreshTokenRepository = new RefreshTokenRepository()
    public async createToken(user: IUser): Promise<TokenData> {
        const expiresIn = new Date().getTime() + 3600000  // an hour
        console.log(expiresIn)
        console.log(expiresIn+36000)
        const secret = "secret"; //change by process.env + add bcrypt
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
          expireIn : expiresIn 
        };
        await this.tokenRepository.addNewToken(dataStoredInToken)
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }
      public async createRefreshToken(user: IUser): Promise<TokenData> {
        const expiresIn = new Date().getTime() + 432600000  // five Day
        console.log(expiresIn)
        console.log(expiresIn+36000)
        const secret = "secret"; //change by process.env + add bcrypt
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id,
          expireIn : expiresIn 
        };
        await this.refreshTokenRepository.addNewToken(dataStoredInToken)
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }
      public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }
      public createCookieRefresh(tokenData: TokenData) {
        return `refreshToken=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }
}

export const authService= new AuthService()