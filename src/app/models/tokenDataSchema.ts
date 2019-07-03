

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const tokenDataSchema = new Schema({
  _id:  {
    type:String,
    required : true
},
  expireIn:  {
    type:String,
    required : true
}
  
  
});

