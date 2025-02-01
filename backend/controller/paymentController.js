const { instance } = require("../paymentConfig/razorpayConfig");

exports.checkout = async (req, res) => {

  console.log(req.body);
  

  const { amount } = req.body
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  // console.log(order);

  res.status(200).json({
    success: true,
    order
  })
};
