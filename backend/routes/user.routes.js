const express=require("express");
const { signup,login, verifiyToken, getUser, refreshToken, logout, question, GetQuestion } = require("../controllers/user-controller");


const router=express.Router();
// router.get("/",(req,res,next)=>{
//     res.send("Hello wordl")
// })


router.post("/question",question)
router.get("/questions",GetQuestion)
router.post("/signup",signup)
router.post("/login",login)
router.get("/user",verifiyToken,getUser)
router.get("/refresh",refreshToken,verifiyToken,getUser)
router.post("/logout",verifiyToken,logout)
//verify token

module.exports=router;