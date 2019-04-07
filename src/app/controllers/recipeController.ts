
import { Request, Response } from 'express';

import { recipeService } from '../service/recipeService';



export class RecipeController{

    public async test(req: Request, res: Response) { 
 
         
        res.json("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawait recipeService.addNewRecipe(req)")
       }
    public async addNewRecipe (req: Request, res: Response) { 
 
         
     res.json(await recipeService.addNewRecipe(req))
    }
    public async updateRecipe (req: Request, res: Response) { 
 
         
        res.json(await recipeService.updateRecipe(req))
    }
    public async  deleteRecipe (req: Request, res: Response) { 
 
         
        res.json( await recipeService.deleteRecipe(req))
    }
    public async getRecipe (req: Request, res: Response) { 
 
         
        res.json( await recipeService.getRecipe(req))
    }
    public async getRecipeById (req: Request, res: Response) { 
 
         
        res.json( await recipeService.getRecipeById(req))
    }
}