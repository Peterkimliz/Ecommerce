const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minlength:3
    },
   password:{
        type:String,
        required:true,
        minlength:7,
         },
    profilePic:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:""
    }     
},{timestamps:true});

module.exports=mongoose.model("users",userSchema);