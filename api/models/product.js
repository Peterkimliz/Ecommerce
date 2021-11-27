const mongoose= require("mongoose");

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        minlength:3
    },
    productDescription:{
        type:String,
        required:true,
        minlength:3
    },
    productPrice:{
        type:Number,
        required:true,
          },

     productImage:{
            type:Buffer,
            required:true,
            },

            },{timestamps:true}
);

module.exports=mongoose.model("products",productSchema);