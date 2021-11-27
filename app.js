const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const morgan=require("morgan");
const devEnv=require("dotenv");
const userRoute=require("./api/routers/user");
const productRoute=require("./api/routers/product");

const app=express();
devEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(result=>{
  console.log("connection to database was successfull");
})
.catch((err)=>{
    console.log("Failed to connect to database"); 
});


////////////////////////middlewares//////////////////////////
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/users",userRoute);
app.use("/products",productRoute);

module.exports=app;