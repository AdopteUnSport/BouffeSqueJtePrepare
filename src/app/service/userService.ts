
import { UserRepository } from "../repository/userRepository";
import { Request } from 'express';
import { IUser, IIngredient } from '../interface';
import { ShoppingList } from "../interface/shoppingList.model";

 class UserService{
    private userRepository = new UserRepository()
    public async addNewContact (req: Request) {
        const newUser = req.body as IUser
        const res = await this.userRepository.addNewUser(newUser);
     
        return res;
    }
    public async getAllUser() {

       return this.userRepository.getAllUser()
    }
    public async login(req: Request) {
     
        const users :IUser[] =await  this.userRepository.getUsersByName(req.query.userName)
        let res  ;
        console.log(JSON.stringify(users))
        for(var user of users){
            if(user.userName===req.query.userName && user.password===req.query.password){
                res = user;
                
                break;
            }
        
        }
        return res;
    }
    public async getUser(req: Request) {
      

        return this.userRepository.getUser(req.params.userId)
    }
    public async getUserByEmail(req: Request) {
   

        return this.userRepository.getUserByEmail(req.body.email)
    }
    public async updateUser(req: Request) {
        const updatedUser = req.body as IUser
        return await this.userRepository.updateUser(req.params.userId,updatedUser)
    }
    public async deleteUser(req: Request) {


        return await this.userRepository.deleteUser(req.params.userId)
    }
    public async getListeIngredient(req: Request) {
        const user : IUser = await this.userRepository.getUser(req.params.userId)

        return user.fridge
    }
    public async addIngredient(req: Request) {
        const newIngredient : IIngredient = req.body as IIngredient
        const user :IUser =await this.userRepository.getUser(req.params.userId)
       user.fridge.push(newIngredient)
       return this.userRepository.updateUser(user._id,user)
    }
    public async updateListeIngredient(req: Request) {
        const newIngredients : IIngredient[] = req.body as IIngredient[]
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.fridge=newIngredients;
        return  await this.userRepository.updateUser(user._id,user)
    }
    public async deleteListeIngredient(req: Request) {

        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.fridge=[];
        return  await this.userRepository.updateUser(user._id,user)
    }
    public async getAllShoppingList(req: Request) {
       
        const res = await this.userRepository.getUser(req.params.userId)

        return  res.shoppingList
    }
    public async getShoppingListById(req: Request) {
       
        const res : IUser = await this.userRepository.getUser(req.params.userId)
        const goodShoppingList = res.shoppingList.find(x=>x._id===req.params.shoppingListId)
        return goodShoppingList
    }
    public async addShoppingList(req: Request) {
        const newIngredients : ShoppingList = req.body as ShoppingList
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.shoppingList.push(newIngredients);
        return  await this.userRepository.updateUser(user._id,user)
    }
    public async addIngredientInShoppingList(req: Request) {
        const newIngredient : IIngredient = req.body as IIngredient
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.shoppingList.find(x=>x._id===req.params.shoppingListId).shoppingList.push(newIngredient)
       return this.userRepository.updateUser(user._id,user)
    }
    public async updateListeIngredientInShoppingList(req: Request) {
        const newIngredients : IIngredient[] = req.body as IIngredient[]
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.shoppingList.find(x=>x._id===req.params.shoppingListId).shoppingList=newIngredients;
        return  await this.userRepository.updateUser(user._id,user)
    }
    public async deleteListeIngredientInShoppingList(req: Request) {

        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.shoppingList.find(x=>x._id===req.params.shoppingListId).shoppingList=[]
        return  await this.userRepository.updateUser(user._id,user)
    }
}

export const userService= new UserService()
