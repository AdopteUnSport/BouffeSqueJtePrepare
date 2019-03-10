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


    public async   addNewRecipe (newRecipe:IRecipe) : Promise<IRecipe> {                
       try {
        const recipeNewToAdd = new Recipe(newRecipe)
        const res = await  recipeNewToAdd.save()
         return res.toObject()
       } catch (error) {
           console.log(error)
       }
        
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
        try {
            console.log("patate")               
            const doc =await Recipe.findById(id)
             console.log("patate")
             return doc.toObject()
        } catch (error) {
            console.log(error)
        }
      
    
    }
    public async getAll (): Promise<IRecipe[]> {    
        try {
          
            const doc = await Recipe.find().exec()
            console.log("test"+JSON.stringify(doc))    
            const arrayRecipe =[];
            await  doc.forEach(element=>{
                arrayRecipe.push(element.toObject())
            })
            console.log("test"+arrayRecipe)    
         return arrayRecipe
        } catch (error) {
            console.log(error)
        }  
      
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