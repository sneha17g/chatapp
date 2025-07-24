import express from "express";
import * as userController from "../controller/userController.js"
 let router = express.Router();
 

 router.post("/signup",userController.signup);
 router.post("/userlogin",userController.userlogin);
 export default router