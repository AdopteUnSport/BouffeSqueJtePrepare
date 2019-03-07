
import { Request, Response } from 'express';
import { userService } from '../service/userService';



export class UserController {

    public getAllUser(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public getUser(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public updateUser(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public deleteUser(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public getListeIngredient(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public addIngredient(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public updateListeIngredient(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public deleteListeIngredient(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }
    public addNewContact(req: Request, res: Response) {
        console.log(JSON.stringify(this))

        res.json(userService.addNewContact(req))
    }

}