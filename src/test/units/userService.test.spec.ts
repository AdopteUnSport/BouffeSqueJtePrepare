
import { expect } from 'chai';

import { Request } from 'express';
import 'mocha';
import { userService } from '../../app/service/userService';
import mongoose = require("mongoose");

const MONGODB_CONNECTION: string = "mongodb://51.83.70.42:27017/testBd";
mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true });

describe('user Service', () => {
  after(function () {
    mongoose.connection.db.dropDatabase()
  })


  describe('getUser', () => {

    it('should return array of length 0', async () => {
      const req = {
        query: {
          text: ""
        },
        body: {
          listeIngredient: []
        }
      } as Request
      const result = await userService.getAllUser()
      expect(result).to.be.an("array").of.lengthOf(0)
    });
    it('should return array of length 1', async () => {
      const reqPost = {
        body: {
          userName: "test",
          fridge: [{
            status: "fresh",
            quantity: "0",
            catagory: "test",
            photoUrls: ["test"],
            name: "oeuf",
            tags: ["test"]
          }],
          firstName: "test",
          lastName: "test",
          email: "test",
          password: "test",
         
        }

      } as Request
     
      await userService.addNewContact(reqPost)
      const result = await userService.getAllUser()
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    it('should return seached user', async () => {
      
      const user  = await userService.getAllUser()
      console.log(JSON.stringify(user))
      const req = {
        params : {
          userId: user[0]._id
        }
      } as Request
      const result = await userService.getUser(req)
      expect(result).to.haveOwnProperty("userName").to.be.equal("test")
    });
    it('should return array of user s fridge', async () => {
      const user  = await userService.getAllUser()
      const req = {
        params : {
          userId: user[0]._id
        }
      } as Request
      const result = await userService.getListeIngredient(req)
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    
  });

  describe('updateUser', () => {
    it('should returnobect with updated property', async () => {
      const user  = await userService.getAllUser()
      console.log("PATATE"+JSON.stringify(user))
      user[0].userName="Thomas";
      const req = {
        params : {
          userId: user[0]._id
        },
        body:user[0]
      } as Request
    
      
      await userService.updateUser(req)
      const req2 = {
        params:{
          userId: user[0]._id
        }
      } as Request
      const res=await userService.getUser(req2)
      expect(res).to.haveOwnProperty("userName").to.be.equal("Thomas")
    });
    it('should return object with updated fridge', async () => {
      const user  = await userService.getAllUser()
      user[0].fridge[0].quantity=200
      const req = {
        params : {
          userId: user[0]._id
        },
        body:user[0].fridge
      } as Request
    
      
      await userService.updateListeIngredient(req)
      const req2 = {
        params:{
          userId: user[0]._id
        }
      } as Request
      const res=await userService.getUser(req2)
      expect(res.fridge[0].quantity).to.be.equal(200)
    });
    it('should return object with added ingredient', async () => {
      const user  = await userService.getAllUser()
      const newIngredient = user[0].fridge[0]
      const req = {
        params : {
          userId: user[0]._id
        },
        body:newIngredient
      } as Request
    
      
      await userService.addIngredient(req)
      const req2 = {
        params:{
          userId: user[0]._id
        },
      } as Request
      const res=await userService.getUser(req2)
      expect(res.fridge).to.be.lengthOf(2)
    });
    it('should delete all ingredient ', async () => {
      const user  = await userService.getAllUser()
    
      const req = {
        params : {
          userId: user[0]._id
        }
       
      } as Request
    
      
      await userService.deleteListeIngredient(req)
      const req2 = {
        params:{
          userId: user[0]._id
        },
      } as Request
      const res=await userService.getUser(req2)
      expect(res.fridge).to.be.lengthOf(0)
    });
  })
});