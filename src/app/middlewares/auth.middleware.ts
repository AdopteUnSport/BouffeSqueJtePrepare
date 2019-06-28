import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import DataStoredInToken from '../interface/dataStoredInToken.model';
import RequestWithUser from '../interface/requestWithUser.model';

import { UserRepository } from '../repository/userRepository';
import { TokenRepository } from '../repository/tokenRepository';
const userRepository = new UserRepository()
const tokenRepository = new TokenRepository();
async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  console.log("DIEUMI")
  const cookies = request.cookies;
  console.log(cookies)
  if (cookies && cookies.Authorization) {
    const secret = "secret";
   
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      if(verificationResponse.expireIn>new Date().getTime()){
        const user = await userRepository.getUser(id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new Error("User Not FOund"));
        }
      }else{
        await tokenRepository.deletetoken(verificationResponse._id)
        next(new Error("Authorization expired"));
      }
     
    } catch (error) {
      next(new Error("Authorization INvalid"));
    }
  } else {
    next(new Error("Authorization Not FOund"));
  }
}
 
export default authMiddleware;