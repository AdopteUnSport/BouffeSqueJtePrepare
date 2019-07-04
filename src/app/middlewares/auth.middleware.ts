import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import DataStoredInToken from '../interface/dataStoredInToken.model';
import RequestWithUser from '../interface/requestWithUser.model';

import { UserRepository } from '../repository/userRepository';
import { TokenRepository } from '../repository/tokenRepository';
import { RefreshTokenRepository } from '../repository/refreshTokenRepository';
import { authService } from '../service/authService';
const userRepository = new UserRepository()
const tokenRepository = new TokenRepository();
const refreshTokenRepository = new RefreshTokenRepository()

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  console.log("DIEUMI")
  const cookies = request.cookies;
  console.log(cookies)
  const secret = "secret";
  if (cookies && cookies.Authorization) {
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      if(verificationResponse.expireIn>new Date().getTime()){
        const user = await userRepository.getUser(id);
        if (user) {
          request.user = user;
          next();
        } else {
          response.status(404)
          next(new Error("User Not FOund"));
        }
      }else{
        await tokenRepository.deletetoken(verificationResponse._id)
        const verificationResponseRefresh = jwt.verify(cookies.refreshToken, secret) as DataStoredInToken;
        if(cookies.refreshToken && verificationResponseRefresh.expireIn>new Date().getTime()){
          await refreshTokenRepository.deletetoken(verificationResponseRefresh._id)
          const user = await userRepository.getUser(id);
          const tokenData = await authService.createToken(user);
          const refreshToken = await authService.createRefreshToken(user);
          response.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
          next()
        }
        response.status(401)
        next(new Error("Authorization expired"));
      }
     
    } catch (error) {
      response.status(401)
      next(new Error("Authorization INvalid"));
    }
  } else {
    const verificationResponseRefresh = jwt.verify(cookies.refreshToken, secret) as DataStoredInToken;
    if(cookies.refreshToken && verificationResponseRefresh.expireIn>new Date().getTime()){
      await refreshTokenRepository.deletetoken(verificationResponseRefresh._id)
      const user = await userRepository.getUser(verificationResponseRefresh._id);
      const tokenData = await authService.createToken(user);
      const refreshToken = await authService.createRefreshToken(user);
      response.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
      next()
    }
    response.status(401)
    next(new Error("Authorization Not FOund"));
  }
}
 
export default authMiddleware;