

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const userSchema = new Schema({
  userName:  {
    type:String,
    required : true
},
  firstName:  {
    type:String
},
  lastName:  {
    type:String
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

