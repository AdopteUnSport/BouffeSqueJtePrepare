
import { Request, response } from 'express';
import { IRecipe } from '../interface';
import { RecipeRepository, IRecipeParametter } from "../repository/recipeRepository";
import { userService } from './userService';
const elasticSearch = require('elasticsearch')
class RecipeService {
    private recipeRepository = new RecipeRepository()
    private client = new elasticSearch.Client({
        host: 'localhost:9200',
        apiVersion: "5.6",
        log: 'trace'
    })
    public async addNewRecipe(recipe: IRecipe) {
       
        const res = await this.recipeRepository.addNewRecipe(recipe)
        return res
    }
    public async updateRecipe(req: Request) {
        const newRecipe = req.body as IRecipe

        return await this.recipeRepository.updateRecipe(newRecipe)
    }
    public async deleteRecipe(req: Request) {
        const newRecipe = req.params.recipeId as string

        return await this.recipeRepository.deleteRecipe(newRecipe)
    }
    public async getRecipe(req: Request) {
        const id = req.query.userId ? req.query.userId : null;
        let listIngredient=null;
        if(id){
            listIngredient =  (await userService.getUser(id)).fridge
        }
        const params = {
            text: req.query.text ? req.query.text : null,
            listIngredient: listIngredient
        } as IRecipeParametter


        if (!params.text && !id) {
            return await this.recipeRepository.getAll()
        } else if (params.text && !id) {
           return await this.recipeRepository.getRecipeByText(params)
        }

        let query = '{"bool":{ "should" : ['
        let i = 0;
        let y = 0;
        params.listIngredient.forEach(element => {

            i++
            query += '{"match" : {"listIngredient.name":"' + element.name + '"}},{"terms" : {"listIngredient.tags":['
            element.tags.forEach(tags => {
                y++
                query += '"' + tags + '"'
                if (element.tags.length !== y) {
                    query += ','
                }
            })


            query += ']}}'
            if (params.listIngredient.length !== i) {
                query += ","
            }
            y = 0
        })
        query += "]}}"
        const response = await this.client.search({
            index: "bouffe",
            type: "recipes",
            body: {
                min_score: 1,
                query: JSON.parse(query)
            },

        })


        const recipeByIngredient = response.hits.hits
      // params.listIngredient.
        recipeByIngredient.forEach(element => {

            for (let i = 0; i < element._source.listIngredient.length; i++) {
                if (!params.listIngredient.find(x => x.name == element._source.listIngredient[i].name)) {

                   
                    const index = recipeByIngredient.findIndex(x => (x._source.name == element._source.name))
                    delete recipeByIngredient[index]
                    break;
                }
            }

           
        });
        const recipeByIngredientCleaned : IRecipe[] = recipeByIngredient.map(element =>{
            return {
              ...element._source,
              "_id":element._id
            } 
          }).filter(x=> x!=null)

        return recipeByIngredientCleaned
    }
    public cleanSearch(eSresult:any){
       const hits=eSresult.hits.hits;
       const cleanSearch :any[]= hits.map(element =>{
          return {
            ...element._source,
            "_id":element._id
          } 
        }).filter(x=> x!=null)
       return cleanSearch
    }
    public async getRecipeById(req: Request) {
        const id = req.params.recipeId;
        return await this.recipeRepository.getRecipeById(id)
    }

}

export const recipeService = new RecipeService()