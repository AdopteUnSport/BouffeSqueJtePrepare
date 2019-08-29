
import { Request, Response } from 'express';

import { recipeService } from '../service/recipeService';
import { UploadedFile } from 'express-fileupload';
import * as fs from "fs"
import { imageService } from '../service/imageService';
import { IImage, IRecipe, IIngredient } from '../interface';
import { isArray } from 'util';


export class RecipeController{

    public async test(req: Request, res: Response) { 
 
         
        res.json("test")
       }
    public async addNewRecipe (req: Request, res: Response) { 
 
        res.status(201)
        const recipe= req.body as IRecipe
        // for test postman
        recipe.listIngredient = JSON.parse(req.body.listIngredient) as Array<IIngredient>
        // remove for prod
       
      
        recipe.photo = []
        if(isArray(req.files.file)){
            const files = req.files.file as UploadedFile[]
            console.log(files)
            for(let i =0;i<files.length;i++) {
                const image = {
                    name :files[i].name
                } as IImage
                const res = await imageService.addImage(image)
                fs.writeFileSync("upload/"+res._id+"/"+res.name,files[i].data)
                recipe.photo.push("http://51.83.70.42:3000/api/images/"+res._id)
                console.log("PATATA"+JSON.stringify(recipe))
            }
        }else{
            const files = req.files.file as UploadedFile
            const image = {
                name :files.name
            } as IImage
            const res = await imageService.addImage(image)
            fs.writeFileSync("upload/"+res._id+"/"+res.name,files.data)
            recipe.photo.push("http://51.83.70.42:3000/api/images/"+res._id)
            console.log("PATATA"+JSON.stringify(recipe))
        }
      
        
        res.json(await recipeService.addNewRecipe(recipe))
    }
    public async updateRecipe (req: Request, res: Response) { 
 
        res.status(202)
        res.json(await recipeService.updateRecipe(req))
    }
    public async  deleteRecipe (req: Request, res: Response) { 
 
        res.status(202)
        res.json( await recipeService.deleteRecipe(req))
    }
    public async getRecipe (req: Request, res: Response) { 
 
        res.status(200) 
        res.json( await recipeService.getRecipe(req))
    }
    public async getRecipeById (req: Request, res: Response) { 
 
        res.status(200)
        res.json( await recipeService.getRecipeById(req))
    }
}