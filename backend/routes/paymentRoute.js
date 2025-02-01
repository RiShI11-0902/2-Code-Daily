const express = require('express')
const router = express.Router()

const paymentController = require("../controller/paymentController")

router.post("/checkout", paymentController.checkout )

module.exports = router
