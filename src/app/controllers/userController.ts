
import { Request, Response } from 'express';
import * as express from 'express';
import { userService } from '../service/userService';
import authMiddleware from '../middlewares/auth.middleware';
var _ =require("lodash")


export class UserController {
    public async getAllUser(req: Request, res: Response) {
        const user =  await userService.getAllUser()
        res.status(200)
        res.json(user)
    }

    public async getUser(req: Request, res: Response) {
        res.status(200)
        res.json(await userService.getUser(req.params.userId))
    }
    public async updateUser(req: Request, res: Response) {
        res.status(202)
        const updaptedUser  = await userService.updateUser(req);
        res.setHeader('content-type','application/json') 
  
        res.status(200).send(updaptedUser)
    }
    public async deleteUser(req: Request, res: Response) {
        res.status(202)
        res.json(await userService.deleteUser(req))
    }
    public async getListeIngredient(req: Request, res: Response) {

        res.status(200)
        res.json(await userService.getListeIngredient(req))
    }
  
    public async addIngredient(req: Request, res: Response) {
        res.status(201)
        res.json(await userService.addIngredient(req))
    }
    public async updateListeIngredient(req: Request, res: Response) {

        res.status(202)
        res.json(await userService.updateListeIngredient(req))
    }
    public async deleteListeIngredient(req: Request, res: Response) {
        res.status(202)
        res.json(await userService.deleteListeIngredient(req))
    }
    public async getAllShoppingList(req: Request, res: Response) {
        const user =  await userService.getAllShoppingList(req)
        res.status(200)
        res.json(user)
    }
    public async getShoppingListById(req: Request, res: Response) {

        res.status(200)
        res.json(await userService.getShoppingListById(req))
    }
    public async addIngredientInShoppingList(req: Request, res: Response) {
        res.status(201)
        res.json(await userService.addIngredientInShoppingList(req))
    }
    public async updateListeIngredientInShoppingList(req: Request, res: Response) {

        res.status(202)
        res.json(await userService.updateListeIngredientInShoppingList(req))
    }
    public async deleteListeIngredientInShoppingList(req: Request, res: Response) {
        res.status(202)
        res.json(await userService.deleteListeIngredientInShoppingList(req))
    }

}
