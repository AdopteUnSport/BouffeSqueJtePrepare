
import { expect } from 'chai';


import 'mocha';
import * as jwt from 'jsonwebtoken';
import mongoose = require("mongoose");
import { authService } from '../../app/service/authService';
import { IUser } from '../../app/interface';
import DataStoredInToken from '../../app/interface/dataStoredInToken.model';

const MONGODB_CONNECTION: string = "mongodb://localhost:27017/testBd";
mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true });

describe.only('auth Service', () => {
  after(function () {
    mongoose.connection.db.dropCollection("user")
  })


  describe('createToken and refresh token', () => {

    it('should return token with iduser 1 ', async () => {
      const user : IUser = {
        _id : "1",
        email : "test@test.fr",
        firstName:"test",
        fridge : [],
        lastName: "test",
        phone:"000000",
        userName:"test",
        password:"test"
      }
      const result = await authService.createToken(user)
      const verificationResponse = jwt.verify(result.token, "secret") as DataStoredInToken;
      expect(verificationResponse._id).equal("1","should be 1")
    });
    it('should return token with iduser 2 ', async () => {
      const user : IUser = {
        _id : "2",
        email : "test@test.fr",
        firstName:"test",
        fridge : [],
        lastName: "test",
        phone:"000000",
        userName:"test",
        password:"test"
      }
      const result = await authService.createRefreshToken(user)
      const verificationResponse = jwt.verify(result.token, "secret") as DataStoredInToken;
      expect(verificationResponse._id).equal("2","should be 2")
    });
   
  });

  describe('create cokie and refresh cookie', () => {
    it('should return correct string ', async () => {
      const user : IUser = {
        _id : "3",
        email : "test@test.fr",
        firstName:"test",
        fridge : [],
        lastName: "test",
        phone:"000000",
        userName:"test",
        password:"test"
      }
      const result = await authService.createRefreshToken(user)
      const cookie = await authService.createCookie(result)
      expect(cookie).equal(`Authorization=${result.token}; HttpOnly; Max-Age=${result.expiresIn}`,"should be 3")
    });
    it('should return correct string', async () => {
      const user : IUser = {
        _id : "4",
        email : "test@test.fr",
        firstName:"test",
        fridge : [],
        lastName: "test",
        phone:"000000",
        userName:"test",
        password:"test"
      }
      const result = await authService.createRefreshToken(user)
      const cookie = await authService.createCookieRefresh(result)
      expect(cookie).equal( `refreshToken=${result.token}; HttpOnly; Max-Age=${result.expiresIn}`,"should be 4")
    });
  })
});