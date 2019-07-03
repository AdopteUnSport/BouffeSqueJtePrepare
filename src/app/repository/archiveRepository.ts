import * as mongoose from 'mongoose';

import { IArchive } from '../interface';
import archiveSchema from '../models/archiveSchema';


const Archive = mongoose.model('Archive', archiveSchema);

export class ArchiveRepository{


public async addNewArchive (archiveNew:IArchive) {     
    try {
        const archiveNewToAdd = new Archive(archiveNew)
       await archiveNewToAdd.save()
    return archiveNewToAdd
    } catch (error) {
        
    }           
       
    }
    public async getAllArchive() : Promise<IArchive[]>{
        try {
            const doc = await Archive.find()
            const res =[]
            await doc.forEach(element=>{
                res.push(element.toObject())
            })
              return res
        } catch (error) {
            console.log(error)
        }
    
    }
    public async  getArchiveById(id : string) {
        try {
            const doc = await Archive.findById(id)
        return doc.toObject()
        } catch (error) {
            console.log(error)
        }
        
    }
    public async  getArchiveByUserId(id : string) {
        try {
            console.log("PATAE"+id)
            const doc = await Archive.findOne({userId:id})
        return doc.toObject()
        } catch (error) {
            console.log(error)
        }
        
    }
    public async updateArchive(id: string , updatedArchive : IArchive) {
        try {
            const doc = await Archive.findByIdAndUpdate(id,updatedArchive)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
       
    }
    public async deleteArchive(id: string) {
        try {
            const doc = await Archive.findByIdAndRemove(id)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
      
    }
   
}