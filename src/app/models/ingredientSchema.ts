
import categorySchema from "./categorySchema";

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
    quantity: {
        type:Number,
        required : true
    },
    category: categorySchema,
    status: ["fresh","out of date"],
    name: {
        type:String,
        required : true
    },
    photoUrls: {
        type:[String],
        required : true
    },
    tags: [String]
   
  
});

export default ingredientSchema ;