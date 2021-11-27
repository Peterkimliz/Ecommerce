const router=require("express").Router();
const userController=require("../controllers/userController");

/////////////////create new user//////////////////////////////
router.post("/register",userController.registerUser);
//////////////////////////////////////login user//////////////
router.post("/login",userController.loginUser);
///////////////////update specific user///////////////////////
router.patch("/:userId",userController.updateUser);
///////////////////delete specific user///////////////////////
router.delete("/:userId",userController.deleteUser);
///////////////////get specific user//////////////////////////
router.get("/:id",userController.getSpecificUser);
///////////////////get all users//////////////////////////
router.get("/",userController.getAllUsers);

module.exports=router;