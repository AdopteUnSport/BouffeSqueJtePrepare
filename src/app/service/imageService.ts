
import { ImageRepository } from "../repository/imageRpository";
import { Request } from 'express';
import { IImage, IIngredient } from '../interface';
import * as fs from "fs"
import { IRecipeParametter } from "../repository/recipeRepository";
 class ImageService{
    private imageRepository = new ImageRepository()
    public async addImage (image: IImage) : Promise<IImage> {  
        const imageSaved=  await this.imageRepository.addNewImage(image)
        fs.mkdirSync("upload/"+imageSaved._id)
        return imageSaved
    }
    public async getAllImage() {
        const res = await this.imageRepository.getAllImage()
       return res
    }
    public async getImage(id:string) {
     
        return await this.imageRepository.getImageById(id)
    }
    public async getImageByTags(req:Request) {
        console.log(req.query)
        const params = {
            text: req.query.tags ? req.query.tags : null
    
        } as  IRecipeParametter    
        return await this.imageRepository.getImageByTags(params)
    }
    public async updateImage(req: Request) {
        const updatedImage = req.body as IImage
        return await this.imageRepository.updateImage(req.params.ImageId,updatedImage)
    }
    public async deleteImage(req: Request) {


        return await this.imageRepository.deleteImage(req.params.ImageId)
    }
    
    
}

export const imageService= new ImageService()