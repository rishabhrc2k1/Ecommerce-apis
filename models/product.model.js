const mongoose = require("mongoose");

const{Schema}=mongoose;

const productSchema= new Schema({
    title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      availability: {
        type: Boolean,
        default: true,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
});

module.exports= mongoose.model("Product", productSchema);