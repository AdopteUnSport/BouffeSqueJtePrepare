

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const imageSchema = new Schema({
  name : String,
  tags: [String],
  recipeId : {
    required:false,
    type:String
  }
  
});
imageSchema.index({"tags" : "text"})
export default imageSchema ;