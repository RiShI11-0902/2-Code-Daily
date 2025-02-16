const express = require('express')
const router = express.Router()

const paymentController = require("../controller/paymentController")

router.post("/checkout", paymentController.checkout )
router.get("/getKey", paymentController.getKey)
router.post("/paymentverification", paymentController.paymentVerification)

module.exports = router
