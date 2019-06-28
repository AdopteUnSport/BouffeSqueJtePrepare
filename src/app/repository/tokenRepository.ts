import * as mongoose from 'mongoose';


import { tokenDataSchema } from '../models';
import DataStoredInToken from '../interface/dataStoredInToken.model';


const Token = mongoose.model('TokenData', tokenDataSchema);

export class TokenRepository{


public async  addNewToken (newToken:DataStoredInToken) {
    try {
        const tokenNewToAdd = new Token(newToken);
        const res = await tokenNewToAdd.save()
    return res.toObject()
    } catch (error) {
        console.log(error)
    }

    }
    public async getAlltoken() : Promise<DataStoredInToken[]>{
        try {
            const doc = await Token.find().exec()
            const res =[]
            await doc.forEach(element=>{
                res.push(element.toObject())
            })
              return res
        } catch (error) {
            console.log(error)
        }

    }
    public async  gettoken(id : string) {
        try {
            const doc = await Token.findById(id).exec()
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }

    }
    
    public async deletetoken(id: string) {
        try {
            const doc = await Token.findByIdAndRemove(id)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }

    }

}
