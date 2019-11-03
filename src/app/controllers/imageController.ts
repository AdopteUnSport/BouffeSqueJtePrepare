
import { Request, Response } from 'express';

import { imageService } from '../service/imageService';
import { IImage } from '../interface';
import { UploadedFile } from 'express-fileupload';
import * as fs from "fs"

export class ImageController {

    public async getAllImage(req: Request, res: Response) {
        res.status(200)
        const img = await imageService.getAllImage()
   
        res.json(img)
    }
    public getImageByName(req: Request, res: Response) {
        res.status(200)
        res.json(imageService.getImage(req.params.id))
    }
    public async getImageById(req: Request, res: Response) {    
        const id = req.params.imageId
        const image = await imageService.getImage(id)
        res.status(200)
        res.sendFile(process.cwd()+"/upload/"+id+"/"+image.name)
    }
    public async getImageByTags(req: Request, res: Response) {
        const image :IImage = await imageService.getImageByTags(req)
     
        if(image._id){
            res.status(200)
            res.sendFile(process.cwd()+"/upload/"+image._id+"/"+image.name)
        }else{
            res.status(404)
            res.json('FileNotFound')
        }
       
    }
    public async addImage(req: Request, res: Response) {
        
        const file = req.files.file as UploadedFile
        
    
       const image = {
            name :file.name,
            tags : req.body.tags
        } as IImage
    
        const imageSaved =  await imageService.addImage(image)
        fs.writeFileSync("upload/"+imageSaved._id+"/"+file.name,file.data)
        res.status(201)
        res.sendFile(process.cwd()+"/upload/"+imageSaved._id+"/"+file.name)
    }
    

}