
import { ImageRepository } from "../repository/imageRpository";
import { Request } from 'express';
import { IImage, IIngredient } from '../interface';
import * as fs from "fs"
import { IRecipeParametter } from "../repository/recipeRepository";
import { isNullOrUndefined, isArray } from "util";
const elasticSearch = require('elasticsearch')
 class ImageService{
    private imageRepository = new ImageRepository()
    private client = new elasticSearch.Client({
        host : 'localhost:9200',
        apiVersion:"5.6",
        log:'trace'
    })
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
        let response;
       
        if(!isArray(params.text)){
             response = await this.client.search({
                index:"bouffe",
                type:"images",
                body : {
                    query: {
                        match :{
                            tags : params.text
                        }
                    }
                }
            })    
        }else{
             response = await this.client.search({
                index:"bouffe",
                type:"images",
                body : {
                    query: {
                        terms :{
                            tags : params.text
                        }
                    }
                }
            })    
        }
       
        if(response.hits.hits[0]){
            const img =  {
                _id :response.hits.hits[0]._id,
                name : response.hits.hits[0]._source.name
            } as IImage
            return  img
        }
       return null
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