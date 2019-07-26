
import { Request, Response } from 'express';

import { recipeService } from '../service/recipeService';
import { UploadedFile } from 'express-fileupload';
import * as fs from "fs"
import { imageService } from '../service/imageService';
import { IImage, IRecipe } from '../interface';


export class RecipeController{

    public async test(req: Request, res: Response) { 
 
         
        res.json("test")
       }
    public async addNewRecipe (req: Request, res: Response) { 
 
        res.status(201)
        const recipe= req.body as IRecipe
        const files = req.files.file as UploadedFile[]
        console.log(files)
        await files.forEach(async element => {
            const image = {
                name :element.name
            } as IImage
            const res = await imageService.addImage(image)
            recipe.photo.push(res._id)
        })
        
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