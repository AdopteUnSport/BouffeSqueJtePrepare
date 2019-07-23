import * as mongoose from 'mongoose';

import { IImage } from '../interface';
import ImageSchema from '../models/imageSchema';


const Image = mongoose.model('Image', ImageSchema);

export class ImageRepository{


public async addNewImage (ImageNew:IImage) : Promise<IImage>{     
    try {
       
        const ImageNewToAdd = new Image(ImageNew)
       
        const imageSaved = await ImageNewToAdd.save()
        
    return  imageSaved.toObject()
    } catch (error) {
        
    }           
       
    }
    public async getAllImage() : Promise<IImage[]>{
        try {
            const doc = await Image.find()
            const res =[]
            await doc.forEach(element=>{
                res.push(element.toObject())
            })
        
              return res
        } catch (error) {
            console.log(error)
        }
    
    }
    public async  getImageById(id : string) {
        try {
            console.log(id)
            const doc = await Image.findById(id)
        return doc.toObject()
        } catch (error) {
            console.log(error)
        }
        
    }
    public async  getImageByName(id : string) {
        try {
            const doc = await Image.findById(id)
        return doc.toObject()
        } catch (error) {
            console.log(error)
        }
        
    }
    public async updateImage(id: string , updatedImage : IImage) {
        try {
            const doc = await Image.findByIdAndUpdate(id,updatedImage)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
       
    }
    public async deleteImage(id: string) {
        try {
            const doc = await Image.findByIdAndRemove(id)
            return doc.toObject()
        } catch (error) {
            console.log(error)
        }
      
    }
   
}