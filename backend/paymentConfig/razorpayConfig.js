const Razorpay = require('razorpay')
exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    headers: {
      "X-Razorpay-Account": process.env.RAZORPAY_MID
    }
  });
  
// instance.orders.all().then(console.log).catch(console.error);