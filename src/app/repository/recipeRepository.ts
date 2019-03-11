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
        try {
            const id = newRecipe._id;
            console.log("patate0"+id)
            delete newRecipe._id
            console.log("patate"+id)
            const doc = await  Recipe.findByIdAndUpdate(id,newRecipe)
            return   doc.toObject()
        } catch (error) {
            console.log(error)
        }                
       
      
     }
     public async deleteRecipe (newRecipe:string): Promise<IRecipe>  {    
         try {
            const doc= await   Recipe.findByIdAndRemove(newRecipe)
      
            return doc.toObject()
         } catch (error) {
             console.log(error)
         }            
       
     }
    public async getRecipeByText (params:IRecipeParametter): Promise<IRecipe[]>{  
        try {
            const doc = await  Recipe.find({$text:{$search:params.text}})
            const arrayRecipe =[];
            await doc.forEach(element=>{
                arrayRecipe.push(element.toObject())
            })
         return arrayRecipe
        } catch (error) {
            console.log(error)
        }              
    
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
          
            const doc = await Recipe.find()
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
        try {
            console.log("ByIngreient"+JSON.stringify(params))
        
            const doc = await  Recipe.find({"listIngredient.name":"params.listIngredient.name"})
            const arrayRecipe =[];
            await doc.forEach(element=>{
                arrayRecipe.push(element.toObject())
            })
         return arrayRecipe
        } catch (error) {
            console.log(error)
        }            
     
    }
}