const bcrypt=require("bcrypt");
const User=require("../models/user");

exports.registerUser=async(req,res)=>{
    try{
        const user= await User.find({email:req.body.email});
     if(user.length>=1){
         res.status(409).json("user with the email already exists try another email");
     }
     else{
         const salt=await bcrypt.genSalt(10);
         var hashedPassword=await bcrypt.hash(req.body.password,salt);
         const user=User({
             email:req.body.email,
             password:hashedPassword,
             name:req.body.name,
                 });
         const result=await user.save()   
         res.status(201).json(result); 
     }
    }catch(error){
    res.status(400).json(error);
    }
 }
exports.loginUser=async(req,res)=>{
    try{
        const user= await User.findOne({email:req.body.email});
     if(user.length<0){
         res.status(404).json("wrong email address");
        }
     else{
        var currentUser=await bcrypt.compare(req.body.password,user.password);
        if(currentUser){
             res.status(201).json("login was successfull");
        }else{
            res.status(210).json("wrong password");    
        }
         }
    }catch(error){
    res.status(400).json(error);
    }
 }
 
 exports.updateUser=async(req,res)=>{
    try{
     const updateOne= await User.findById(req.params.userId);
     if(updateOne){
         if(req.body.password){
             try{
                 const salt=await bcrypt.genSalt(10)
                  req.body.password=await bcrypt.hash(req.body.password,salt)
             }catch(err){
                return res.status(500).json({messaage:err})
             }
         }
        try{
            const user=await User.findByIdAndUpdate(req.params.userId,{$set:req.body})
            res.status(200).json({messaage:"profile has been updated"});

        }catch(err){
          return  res.status(500).json({messaage:err})
         }           
        }
     else{
        res.status(404).json({messaage:"user doesnot exists"})
     }   
     }catch(err){
    res.status(500).json({message:err})
    }
}

exports.deleteUser=async(req,res)=>{
    try{
     const updateOne= await User.findById(req.params.userId);
     if(updateOne){
      try{
           await User.remove({ _id:req.params.userId});
            res.status(200).json({messaage:"Account has been deleted"});

        }catch(err){
          return  res.status(500).json({messaage:"failed to delete"})
         }     
         }
         else{
        res.status(404).json({messaage:"user doesnot exists"})
     }   
    }catch(err){
    res.status(500).json({message:err});
   }
}

exports.getSpecificUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const user= await User.findById(id);
     if(user){
        const {_id,password,__v, ...others}=user._doc;
        res.status(200).json(others);
        }
     else{   
         res.status(404).json("user doesnot exists"); 
     }
    }catch(error){
    res.status(500).json(error);
    }
 }

 exports.getAllUsers=async(req,res)=>{
    try{
          const user=await User.find();
          if(user.length>=1){
            const finalUserDisplay={
                count:user.length,
                users:user.map(user=>
                    {
                        return{
                            _id:user._id,
                            email:user.email,
                            username:user.name,
                            profilePic:user.profilePic,
                            status:user.status,
                            }
                    })
                }  
            res.status(200).json(finalUserDisplay);  
          }else{
            res.status(404).json("no users found");  
          }      

    }catch(err){
        res.status(500).json(err)
    }

}