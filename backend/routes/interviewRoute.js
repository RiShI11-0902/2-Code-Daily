const express = require('express')
const router = express.Router()
const InterviewController = require("../controller/intreviewController")

router
.post("/interview", InterviewController.createInterview )

module.exports = router