
import { Request, Response } from 'express';
import { userService } from '../service/userService';



export class UserController {

    public getAllUser(req: Request, res: Response) {
        res.json(userService.getAllUser())
    }
    public getUser(req: Request, res: Response) {

        res.json(userService.getUser(req))
    }
    public updateUser(req: Request, res: Response) {
       

        res.json(userService.updateUser(req))
    }
    public deleteUser(req: Request, res: Response) {
       
        res.json(userService.deleteUser(req))
    }
    public getListeIngredient(req: Request, res: Response) {
        

        res.json(userService.getListeIngredient(req))
    }
    public addIngredient(req: Request, res: Response) {
     
        res.json(userService.addIngredient(req))
    }
    public updateListeIngredient(req: Request, res: Response) {
       

        res.json(userService.updateListeIngredient(req))
    }
    public deleteListeIngredient(req: Request, res: Response) {
    
        res.json(userService.deleteListeIngredient(req))
    }
    public addNewContact(req: Request, res: Response) {
    
        res.json(userService.addNewContact(req))
    }

}