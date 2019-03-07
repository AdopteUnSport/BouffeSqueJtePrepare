
import { Request } from 'express';
import { IRecipe } from '../interface';
import { RecipeRepository, IRecipeParametter } from "../repository/recipeRepository";

class RecipeService{
    private recipeRepository = new RecipeRepository()
    public async addNewRecipe (req: Request) {  
        const newRecipe = req.body as IRecipe     
        console.log("patae"+JSON.stringify(newRecipe))                
        return await this.recipeRepository.addNewRecipe(newRecipe)
    }
    public async updateRecipe (req: Request) {  
        const newRecipe = req.body as IRecipe     
        console.log("patae"+JSON.stringify(newRecipe))                
        return await this.recipeRepository.updateRecipe(newRecipe)
    }
    public async deleteRecipe (req: Request) {  
        const newRecipe = req.params.recipeId as string  
        console.log("patae"+JSON.stringify(newRecipe))                
        return await this.recipeRepository.deleteRecipe(newRecipe)
    }
    public async getRecipe (req: Request) {  
        const params = {
            text: req.query.text ? req.query.text : null,
            listIngredient: req.body.listIngredient ? req.body.listIngredient : null,
            quantity : req.body.quantity ? req.body.quantity : null
        } as  IRecipeParametter    
        if(!params.text && !params.listIngredient){
            return await this.recipeRepository.getAll()
        }else if(params.text){
            return await this.recipeRepository.getRecipeByText(params)
        }              
        return await this.recipeRepository.getRecipeByIngredient(params)
    }
    public async getRecipeById (req: Request) {  
        const id = req.params.recipeId;                  
        return await this.recipeRepository.getRecipeById(id)
    }
    
}

export const recipeService= new RecipeService()