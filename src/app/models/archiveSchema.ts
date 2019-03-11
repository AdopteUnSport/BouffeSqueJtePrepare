

import ingredientSchema from './ingredientSchema';
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const archiveSchema = new Schema({
  userId:  {
    type:String,
    required : true
},
  archive: [[ingredientSchema]]
  
});

export default archiveSchema ;