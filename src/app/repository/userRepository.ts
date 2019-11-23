import * as mongoose from 'mongoose';
import { userSchema } from '../models/userSchema';
import { IUser } from '../interface';


const User = mongoose.model('User', userSchema);

export class UserRepository{


public async  addNewUser (userNew:IUser) {
    try {
        const userNewToAdd = new User(userNew);
        const res = await userNewToAdd.save()
    return res.toObject()
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
    public async  getUserByEmail(email : string) {
        try {
            const doc = await User.findOne({email: email}).exec()
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }

    }
    public async  getUsersByName(byName : string) {
        try {
          
            const doc = await User.find({userName: byName}).exec()
            const res =[]
            await doc.forEach(element=>{
                res.push(element.toObject())
            })
              return res
        } catch (error) {
            console.log(error)
        }

    }
    public async updateUser(id: string , updatedUser : IUser) {
        try {
            console.log("DIEUMI3"+id)
             await User.findByIdAndUpdate(id,updatedUser)
             const doc = await User.findById(id)
          
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
