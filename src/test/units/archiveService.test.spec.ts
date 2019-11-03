
import { expect } from 'chai';

import { Request } from 'express';
import 'mocha';

import mongoose = require("mongoose");
import { archiveService } from '../../app/service/archiveService';
import { IArchive, IIngredient } from '../../app/interface';

const MONGODB_CONNECTION: string = "mongodb://localhost:27017/testBd";
mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true });

describe('archive Service', () => {
  after(function () {
    mongoose.connection.db.dropCollection('archive')
  })


  describe('getArchive', () => {

    it('should return array of length 0', async () => {
      
      const result = await archiveService.getAllArchive()
      expect(result).to.be.an("array").of.lengthOf(0)
    }).timeout(5000);;
    it('should return array of length 1', async () => {
      const reqPost = {
        body: {
         
          userId: "1",
          archive: [[{
            
            quantity: 0,
            category: {
              id:"1",
              name:"test"
            },
            name: "oeuf",
            tags: ["test"]
          } as IIngredient
        ]
      ],
          
         
        } as IArchive

      } as Request
     
      await archiveService.addArchive(reqPost)
      const result = await archiveService.getAllArchive()
      console.log(JSON.stringify(result))
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    it('should return seached users archive', async () => {
      
      const req = {
        params : {
          userId: "1"
        }
      } as Request
      const result = await archiveService.getArchiveByUserId(req)
      expect(result).to.haveOwnProperty("userId").to.be.equal("1")
    });
    it('should return array of user s fridge', async () => {
    
      const req = {
        params : {
          userId:1
        }
      } as Request
      const result = await archiveService.getListeIngredient(req)
      expect(result).to.be.an("array").of.lengthOf(1)
    });
    
  });


});