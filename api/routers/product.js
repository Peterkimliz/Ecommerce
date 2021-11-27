const router=require("express").Router();
const productController=require("../controllers/productController");
const multer=require("multer");


const upload=multer({
    limits:{
        fileSize:1024*1024*5,
    },
    fileFilter(req,file,callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
               return callback(new Error("only images can be uploaded"));
            }
            callback(undefined,true);
        }
    });

/////////////////create new Product//////////////////////////////
router.post("/",upload.single("image"),productController.postProduct,
(error,req,res,next)=>{
   res.status(400).json({errorOccured:error.message})
});
///////////////////update specific Product///////////////////////
router.patch("/:productId",upload.single("productImage"),productController.updateProduct);
///////////////////delete specific Product///////////////////////
router.delete("/:productId",productController.deleteProduct);
///////////////////get all Product////////////////////////////////
router.get("/",productController.getAllProduct);
///////////////////get specific Product//////////////////////////
router.get("/:productId",productController.getSpecificProduct);

module.exports=router;