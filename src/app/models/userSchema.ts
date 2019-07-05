

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const userSchema = new Schema({
  userName:  {
    type:String,
    required : true,
    minlength : 6
},
  firstName:  {
    type:String
},
  lastName:  {
    type:String
},
  email:  {
    type:String,
    required : true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  password:  {
    type:String,
    required : true,
    minlength : 6
},
  phone:  String,
  fridge: [ingredientSchema]
  
});

