
import { UserRepository } from "../repository/userRepository";
import { Request } from 'express';
import { IUser, IIngredient } from '../interface';

 class UserService{
    private userRepository = new UserRepository()
    public async addNewContact (req: Request) {  
        const newUser = req.body as IUser      
        
        return this.userRepository.addNewUser(newUser)
    }
    public async getAllUser() {
        console.log(JSON.stringify(this))

       return this.userRepository.getAllUser()
    }
    public async getUser(req: Request) {
        console.log(JSON.stringify(this))

        return this.userRepository.getUser(req.params.userId)
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

        return user.listIngredient
    }
    public async addIngredient(req: Request) {
        const newIngredient : IIngredient = req.body as IIngredient
        const user :IUser =await this.userRepository.getUser(req.params.userId)
       user.listIngredient.push(newIngredient)
       return this.userRepository.updateUser(user.id,user)
    }
    public async updateListeIngredient(req: Request) {
        const newIngredients : IIngredient[] = req.body as IIngredient[]
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.listIngredient=newIngredients;
        return  await this.userRepository.updateUser(user.id,user)
    }
    public async deleteListeIngredient(req: Request) {
      
        const user :IUser =await this.userRepository.getUser(req.params.userId)
        user.listIngredient=[];
        return  await this.userRepository.updateUser(user.id,user)
    }
}

export const userService= new UserService()