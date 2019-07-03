
import { Request, Response } from 'express';
import * as express from 'express';
import { userService } from '../service/userService';
import authMiddleware from '../middlewares/auth.middleware';
var _ =require("lodash")


export class UserController {
   /* public path = '/user';
    public router = express.Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware ,this.getAllUser);

    }*/
    public async getAllUser(req: Request, res: Response) {
        const user =  await userService.getAllUser()
        
        res.json(user)
    }
    public async getUser(req: Request, res: Response) {

        res.json(await userService.getUser(req))
    }
    public async updateUser(req: Request, res: Response) {


        res.json(await userService.updateUser(req))
    }
    public async deleteUser(req: Request, res: Response) {

        res.json(await userService.deleteUser(req))
    }
    public async getListeIngredient(req: Request, res: Response) {


        res.json(await userService.getListeIngredient(req))
    }
    public async addIngredient(req: Request, res: Response) {

        res.json(await userService.addIngredient(req))
    }
    public async updateListeIngredient(req: Request, res: Response) {


        res.json(await userService.updateListeIngredient(req))
    }
    public async deleteListeIngredient(req: Request, res: Response) {

        res.json(await userService.deleteListeIngredient(req))
    }
   

}
