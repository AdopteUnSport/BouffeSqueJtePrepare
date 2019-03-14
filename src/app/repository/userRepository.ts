import * as mongoose from 'mongoose';
import { userSchema } from '../models/userSchema';
import { IUser } from '../interface';


const User = mongoose.model('User', userSchema);

export class UserRepository{


public async  addNewUser (userNew:IUser) { 
    try {
        const userNewToAdd = new User(userNew)
        await userNewToAdd.save()
    return userNewToAdd
    } catch (error) {
        console.log(error)
    }               
      
    }
    public async getAllUser() : Promise<IUser[]>{
        try {
            const doc = await User.find().exec()
            const res =[]
            await doc.forEach(element=>{
                res.push(element.toObject())
            })
              return res
        } catch (error) {
            console.log(error)
        }
    
    }
    public async  getUser(id : string) {
        try {
            const doc = await User.findById(id).exec()
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
     
    }
    public async updateUser(id: string , updatedUser : IUser) {
        try {
            console.log(JSON.stringify(updatedUser))
            const doc = await User.findByIdAndUpdate(id,updatedUser)
          
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
       
    }
    public async deleteUser(id: string) {
        try {
            const doc = await User.findByIdAndRemove(id)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
       
    }
   
}