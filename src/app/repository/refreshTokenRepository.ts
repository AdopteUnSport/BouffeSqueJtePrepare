import * as mongoose from 'mongoose';



import DataStoredInToken from '../interface/dataStoredInToken.model';
import { refreshTokenDataSchema } from '../models';


const RefreshToken = mongoose.model('RefreshTokenData', refreshTokenDataSchema);

export class RefreshTokenRepository{


public async  addNewToken (newToken:DataStoredInToken) {
    try {
        const tokenNewToAdd = new RefreshToken(newToken);
        const res = await tokenNewToAdd.save()
    return res.toObject()
    } catch (error) {
        console.log(error)
    }

    }
    public async getAlltoken() : Promise<DataStoredInToken[]>{
        try {
            const doc = await RefreshToken.find().exec()
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
            const doc = await RefreshToken.findById(id).exec()
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }

    }
    
    public async deletetoken(id: string) {
        try {
            const doc = await RefreshToken.findByIdAndRemove(id)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }

    }

}
