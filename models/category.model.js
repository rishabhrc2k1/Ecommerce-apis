const mongoose = require("mongoose");
const {Schema}= mongoose;

const categorySchema= new Schema({
    category:{
        type: String,
        required: true,
        unique: true,
    }
})

module.exports=mongoose.model("Category",categorySchema);