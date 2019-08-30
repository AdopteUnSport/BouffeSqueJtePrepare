
import { expect } from 'chai';

import { Request } from 'express';
import 'mocha';
import { recipeService } from '../../app/service/recipeService';
import mongoose = require("mongoose");

const MONGODB_CONNECTION: string = "mongodb://localhost:27017/testBd";
mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true });

describe('recipe Service', () => {
  after(function () {
    mongoose.connection.db.dropCollection('recipes')
  })


  describe('getRecipe', () => {

    it('should return array of length 0', async () => {
      const req = {
        query: {
          text: ""
        },
        body: {
          listeIngredient: []
        }
      } as Request
      const result = await recipeService.getRecipe(req)
      expect(result).to.be.an("array").of.lengthOf(0)
    });
    it('should return array of length 1', async () => {
      const reqPost = {
        body: {
          name: "sauce",
          listIngredient: [{
            status: "fresh",
            quantity: "0",
            catagory: "test",
            photoUrls: ["test"],
            name: "oeuf",
            tags: ["test"]
          }],
          description: "test",
          tags: ["test"]
        }

      } as Request
      const req = {
        query: {
          text: ""
        },
        body: {
          listeIngredient: []
        }
      } as Request
      await recipeService.addNewRecipe(reqPost.body)
      const result = await recipeService.getRecipe(req)
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    it('should return array of seached recipe', async () => {
      const reqPost = {
        body: {
          name: "bbq",
          listIngredient: [{
            status: "fresh",
            quantity: "0",
            catagory: "test",
            photoUrls: ["test"],
            name: "oeuf",
            tags: ["test"]
          }],
          description: "test0",
          tags: ["test"]
        }

      } as Request
      const req = {
        query: {
          text: "bbq"
        },
        body: {
          listeIngredient: []
        }
      } as Request
      await recipeService.addNewRecipe(reqPost.body)
      const result = await recipeService.getRecipe(req)
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    it('should clean ESSearch', () => {
      const object: any = {
        hits : {
          hits : [
            {
              "_id":"1",
              "_source":{
                "test":"test",
                "test2":"test2"
              }
            },{
              "_id":"222222",
              "_source":{
                "test":"test3",
                "test2":"test4"
              }
            }
          ]
        }
      }
      const result = recipeService.cleanSearch(object)
      expect(result).to.be.an("array").of.lengthOf(2)
    });
    it('should return array of searched recipe with multiple keyword', async () => {
      const reqPost = {
        body: {
          name: "bbqq",
          listIngredient: [{
            status: "fresh",
            quantity: "0",
            catagory: "test",
            photoUrls: ["test"],
            name: "poisson",
            tags: ["test"]
          }],
          description: "test55",
          tags: ["test"]
        }

      } as Request
      const req = {
        query: {
          text: "bbq test55"
        },
        body: {
          listeIngredient: []
        }
      } as Request
      await recipeService.addNewRecipe(reqPost.body)
      const result = await recipeService.getRecipe(req)
      expect(result).to.be.an("array").of.lengthOf(2)
    });
    it('should return array of length 3', async () => {
      const req = {
        query: {
          text: "poisson"
        },
        body: {
         
        }
      } as Request
      const result = await recipeService.getRecipe(req)
      expect(result).to.be.an("array").of.lengthOf(1)
    });
  });

  describe('updateRecipe', () => {
    it('should returnobect with updated property', async () => {
      const reqPost = {
        body: {
          name: "sauce",
          listIngredient: [{
            status: "fresh",
            quantity: "0",
            catagory: "test",
            photoUrls: ["test"],
            name: "oeuf",
            tags: ["test"]
          }],
          description: "test",
          tags: ["test"]
        }

      } as Request
     
      const result = await recipeService.addNewRecipe(reqPost.body)
      const id = result._id
     
      result.name = "saucebbq"
      const req = {
        body: result
      } as Request
      await recipeService.updateRecipe(req)
      const req2 = {
        params:{
          recipeId: id
        }
      } as Request
      const res=await recipeService.getRecipeById(req2)
      expect(res).to.haveOwnProperty("name").to.be.equal("saucebbq")
    });
  })
});