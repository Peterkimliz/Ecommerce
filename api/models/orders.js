const mongoose= require("mongoose");

const orderSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    productName:{
        type:String,
        required:true,
        minlength:3
    },
   productPrice:{
        type:Number,
        required:true,
          },
   productQuantity:{
     type:Number,
      required:true,
       }, 
     totalCost:{
         type:"Number",
         required:true
        },
     productImage:{
            type:String,
            default:" "
             },   
            },
 {timestamps:true}
);

module.exports=mongoose.model("orders",orderSchema);