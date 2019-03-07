
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type:String,
        required : true
    }
  
});

export default categorySchema;