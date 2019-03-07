import * as mongoose from 'mongoose';
import { userSchema } from '../models/userSchema';
import { IUser } from '../interface';


const User = mongoose.model('User', userSchema);

export class UserRepository{


public addNewUser (userNew:IUser) {                
       const userNewToAdd = new User(userNew)
        userNewToAdd.save()
    return userNewToAdd
    }
    public async getAllUser() : Promise<IUser[]>{
     const doc = await User.find().exec()
     const res =[]
     await doc.forEach(element=>{
         res.push(element.toObject())
     })
       return res
    }
    public async  getUser(id : string) {
        const doc = await User.findById(id).exec()
        return doc.toObject()
    }
    public async updateUser(id: string , updatedUser : IUser) {
        const doc = await User.findByIdAndUpdate(id,updatedUser)
        return doc.toObject()
    }
    public async deleteUser(id: string) {
        const doc = await User.findByIdAndRemove(id)
        return doc.toObject()
    }
   
}