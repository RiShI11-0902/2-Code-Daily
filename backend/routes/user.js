const express = require('express')
const router = express.Router()
const userCotroller = require("../controller/User")
const { verifyToken } = require('../helpers/jwt')
const passport = require('passport')


router
.get("/google",passport.authenticate('google',{scope:["profile","email"]}))
.get("/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/dashboard",
    failureRedirect:"/"
}))
.get("/isLoggedIn", async (req,res)=>{
    console.log("called");
    if (req.user) {
        console.log("called req.user");
        console.log(req.user);
      return  res.status(200).json({message:"Succes",data:req.user})
    }else{
       return res.status(401).json({message:"Failed"})
    }
})
.get("/logout", userCotroller.logout)
.post("/solvedQuestions", userCotroller.solvedQuestions)
.post("/getProgress" , userCotroller.getProgress)

module.exports = router
