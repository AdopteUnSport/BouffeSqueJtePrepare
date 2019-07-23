

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const shoppingListSchema = new Schema({
  archived:  {
    type:Boolean,
    required : true,
 
},
  
  shoppingList: [ingredientSchema]
  
});

