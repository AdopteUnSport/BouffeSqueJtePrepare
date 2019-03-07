import * as mongoose from 'mongoose';
import {  IRecipe, IIngredient } from '../interface';
import recipeSchema from '../models/recipeSchema';

export interface IRecipeParametter{
    text: String,
    quantity: number,
    listIngredient: [IIngredient]
}

const Recipe = mongoose.model('Recipe', recipeSchema);

export class RecipeRepository{


    public async addNewRecipe (newRecipe:IRecipe) : Promise<IRecipe> {                
       const recipeNewToAdd = new Recipe(newRecipe)
        await  recipeNewToAdd.save()
    return recipeNewToAdd.toObject()
    }
    public async updateRecipe (newRecipe:IRecipe) : Promise<IRecipe> {                
        const doc = await  Recipe.findByIdAndUpdate(newRecipe.id,newRecipe).exec();
     return   doc.toObject()
      
     }
     public async deleteRecipe (newRecipe:string): Promise<IRecipe>  {                
        const doc= await   Recipe.findByIdAndRemove(newRecipe).exec()
      
     return doc.toObject()
     }
    public async getRecipeByText (params:IRecipeParametter): Promise<IRecipe[]>{                
        const doc = await  Recipe.find({$text:{$search:params.text}}).exec()
        const arrayRecipe =[];
        await doc.forEach(element=>{
            arrayRecipe.push(element.toObject())
        })
     return arrayRecipe
    }
    public async getRecipeById (id:string): Promise<IRecipe>  {                
      const doc =await Recipe.findById(id).exec()
       
     return doc.toObject()
    }
    public async getAll (): Promise<IRecipe[]> {                
        const doc =await Recipe.find().exec()
        const arrayRecipe =[];
        await  doc.forEach(element=>{
            arrayRecipe.push(element.toObject())
        })
     return arrayRecipe
    }
    public async getRecipeByIngredient (params:IRecipeParametter): Promise<IRecipe[]> {                
        const doc = await  Recipe.find({"listIngredient.name":"params.listIngredient.name"}).exec()
        const arrayRecipe =[];
        await doc.forEach(element=>{
            arrayRecipe.push(element.toObject())
        })
     return arrayRecipe
    }
}