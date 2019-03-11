

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const userSchema = new Schema({
  username:  {
    type:String,
    required : true
},
  firstName:  {
    type:String,
    required : true
},
  lastName:  {
    type:String,
    required : true
},
  email:  {
    type:String,
    required : true
},
  password:  {
    type:String,
    required : true
},
  phone:  String,
  fridge: [ingredientSchema]
  
});

