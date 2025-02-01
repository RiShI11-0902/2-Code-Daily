const express = require('express')
const router = express.Router()
const problemController = require("../controller/interview")

router
.post("/getProblem", problemController.getProblem )
.post("/getAnswer", problemController.getAnswer)
.post("/verify-email", problemController.verifyEmail)

module.exports = router