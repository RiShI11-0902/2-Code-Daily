const express = require('express')
const router = express.Router()
const userCotroller = require("../controller/userController")

router
.get("/totalusers", userCotroller.totalUsers)
.post("/solvedQuestions", userCotroller.solvedQuestions)
.post("/getProgress" , userCotroller.getProgress)
.post("/email" , userCotroller.emails)
.post("/analyze-progress" , userCotroller.analyzeAndGeneratePlan)


module.exports = router
