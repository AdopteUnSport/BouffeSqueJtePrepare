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
  const cookies = request;
 
  const secret = "secret";
  if (cookies && cookies.get("authorization")) {
    try {
      const token = JSON.parse(cookies.get("authorization"))
      const verificationResponse = jwt.verify(token.token, secret) as DataStoredInToken;
    
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
        const verificationRefresh =JSON.parse(cookies.get("refreshToken"))
        console.log("carrote"+verificationRefresh)
        const verificationResponseRefresh = jwt.verify(verificationRefresh.token, secret) as DataStoredInToken;
        console.log("patate"+JSON.stringify(verificationResponseRefresh))
        if(cookies.get("refreshToken") && verificationResponseRefresh.expireIn>new Date().getTime()){
          await refreshTokenRepository.deletetoken(verificationResponseRefresh._id)
          const user = await userRepository.getUser(id);
          const tokenData = await authService.createToken(user);
          const refreshToken = await authService.createRefreshToken(user);
         // response.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
          response.setHeader('Authorization',JSON.stringify(tokenData));
          response.setHeader('refreshToken',JSON.stringify(refreshToken));
          console.log("carrote0")
          next()
        }else{
          response.status(401)
          next(new Error("Authorization expired"));
        }
       
      }
     
    } catch (error) {
      console.log(error)
      response.status(401)
      next(new Error("Authorization INvalid"));
    }
  } else {
    const verificationResponseRefresh = jwt.verify(cookies.get("refreshToken"), secret) as DataStoredInToken;
    if(cookies.get("refreshToken") && verificationResponseRefresh.expireIn>new Date().getTime()){
      await refreshTokenRepository.deletetoken(verificationResponseRefresh._id)
      const user = await userRepository.getUser(verificationResponseRefresh._id);
      const tokenData = await authService.createToken(user);
      const refreshToken = await authService.createRefreshToken(user);
   // response.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
      response.setHeader('Authorization',JSON.stringify(tokenData));
      response.setHeader('refreshToken',JSON.stringify(refreshToken));
      next()
    }
    response.status(401)
    next(new Error("Authorization Not FOund"));
  }
}
 
export default authMiddleware;