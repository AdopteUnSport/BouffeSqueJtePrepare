
import { Request, Response } from 'express';

import { recipeService } from '../service/recipeService';
import { UploadedFile } from 'express-fileupload';



export class RecipeController{

    public async test(req: Request, res: Response) { 
 
         
        res.json("test")
       }
    public async addNewRecipe (req: Request, res: Response) { 
 
        res.status(201)
        const files = req.files.file as UploadedFile[]
        console.log(files)
        res.json(await recipeService.addNewRecipe(req))
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