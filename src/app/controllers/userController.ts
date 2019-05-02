
import { Request, Response } from 'express';
import { userService } from '../service/userService';



export class UserController {

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
    public async addNewContact(req: Request, res: Response) {

        res.json(await userService.addNewContact(req))
    }

}
