
import { Request, Response } from 'express';
import { userService } from '../service/userService';
import { authService } from '../service/authService';
import TokenData from '../interface/tokenData.model';
import { IUser } from '../interface';

var _ =require("lodash")


export class AuthController {
  
    public async addNewContact(req: Request, res: Response) {
        const user : IUser= await userService.addNewContact(req)
        user.password= undefined

        // a enlever pour faire la verification par mail
        const tokenData = await authService.createToken(user);
        const refreshToken = await authService.createRefreshToken(user);
        res.setHeader('Set-Cookie', [authService.createCookie(tokenData),authService.createCookieRefresh(refreshToken)]);
        res.send(user);
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
        res.send(user);
    }
    public async logout(req: Request, res: Response) {
        // mettre en place norme JWT ici suppression du token enregistrer en db$*
        
        res.json("disconnected")
    }
  
}
