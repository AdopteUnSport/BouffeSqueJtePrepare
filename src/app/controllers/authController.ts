
import { Request, Response } from 'express';
import { userService } from '../service/userService';
import { authService } from '../service/authService';
import TokenData from '../interface/tokenData.model';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interface';
import DataStoredInToken from '../interface/dataStoredInToken.model';
import { isNullOrUndefined } from 'util';

var _ =require("lodash")


export class AuthController {
  
    public async addNewContact(req: Request, res: Response) {
        
        const userExist = await userService.getUserByEmail(req)
        console.log("PATAE"+JSON.stringify(userExist))
        if(isNullOrUndefined(userExist)){
            console.log("Dieumi")
            const user : IUser= await userService.addNewContact(req)
            user.password= undefined
    
            // a enlever pour faire la verification par mail
            /*const tokenData = await authService.createToken(user);
            const refreshToken = await authService.createRefreshToken(user);
            res.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);*/
            res.status(201)
            res.send(user);
        }
        res.status(400)
        res.send(new Error("email already exist"));
    }
    public async login(req: Request, res: Response) {
        // mettre en place norme JWT a voir si on utilise 2 serveurs
        const user = await userService.login(req)
        if(_.isNil(user)){
            res.status(400).json("Erreur dans l'authentification ")
        }
        user.password = undefined;
        const tokenData = await authService.createToken(user);
        const refreshToken = await authService.createRefreshToken(user);
        res.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
        res.status(202)
        res.send(user);
    }
    public async logout(req: Request, res: Response) {
        // mettre en place norme JWT ici suppression du token enregistrer en db$*
        const cookies = req.cookies;
        const auth = jwt.verify(cookies.Authorization, "secret") as DataStoredInToken;
        const refresh = jwt.verify(cookies.refreshToken, "secret") as DataStoredInToken;
        await authService.logout(auth._id,refresh._id)
        res.status(200)
        res.json("disconnected")
    }
  
}
