
import ingredientSchema from "./ingredientSchema";
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    name:{
        type:String,
        required : true
    },
    description: {
        type:String,
        required : true
    },
    listIngredient: [ingredientSchema],
    tags:{
        type:[String],
        required : true
    },
  
  
});
recipeSchema.index({"name" : "text","description" : "text","tags" : "text", "listIngredient.name":"text", "listIngredient.quantity":1 })
export default recipeSchema
