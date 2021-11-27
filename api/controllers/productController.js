const Product=require("../models/product");

exports.postProduct=async(req,res)=>{
    try{
        const product=new Product({
            productName:req.body.name,
            productPrice:req.body.priceing,
            productDescription:req.body.description,
            productImage:req.file.buffer
           });
    const result=await product.save();
    res.status(201).json("product has been uploded successfully");     

    }catch(err){
        res.status(400).json(err)
    }

}
exports.updateProduct=async(req,res)=>{
    try{
          const product=await Product.findById(req.params.productId);
          if(product){            
                await Product.findByIdAndUpdate(req.params.productId,{$set:req.body})
                 res.status(200).json("product has been updated successfully");
                 }
          else{
            res.status(404).json("no product with that id");  
          }
           
    }catch(err){
        res.status(400).json(err)
    }
}
exports.deleteProduct=async(req,res)=>{
    const id=req.params.productId
    try{
          const product=await Product.findById(id);
          if(product){
           await Product.remove({_id:id});   
           res.status(200).json("product deleted successfully");  
          }else{
            res.status(404).json("the product does not exists");  
         }
        }
         catch(err){
        res.status(400).json(err)
    }
}

exports.getAllProduct=async(req,res)=>{
    try{
          const product=await Product.find();
          if(product){
            const finalProductDisplay={
                count:product.length,
                products:product.map(product=>
                    {
                        return{
                            _id:product._id,
                            productName:product.productName,
                            productDescription:product.productDescription,
                            productPrice:product.productPrice,
                            productImage:product.productImage,
                            }
                    })
                }  
            res.status(200).json(finalProductDisplay);  
          }else{
            res.status(404).json("no products yet");  
          }      

    }catch(err){
        res.status(400).json(err)
    }

}

exports.getSpecificProduct=async(req,res)=>{
    const id=req.params.productId
    try{
          const product=await Product.findById(id);
          if(product){
            const {createdAt,updatedAt,__v, ...others}=product._doc;
            res.status(200).json(others);  
          }else{
            res.status(404).json("no product with that id");  
          }      

    }catch(err){
        res.status(400).json(err)
    }
}