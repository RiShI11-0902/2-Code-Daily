const User = require("../models/user");
const { instance } = require("../paymentConfig/razorpayConfig");
const crypto = require("node:crypto");
exports.getKey = async = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_TEST_ID });
    // console.log(process.env.RAZORPAY_TEST_ID);
  } catch (error) {
    console.log(error);
  }
};
exports.checkout = async (req, res) => {
  // console.log(req.body);

  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    const totalUsers = (await User.find().countDocuments()) > 100;
    let amount = "0";
    if (findUser.earlySubscriber || totalUsers < 100) {
      amount = "10000";
      findUser.earlySubscriber = true;
      await findUser.save()
    } else {
      amount = "20000";
    }
    const options = {
      amount: Number(amount),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    // console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.paymentVerification = async (req, res) => {
  // console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, email } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const findUser = await User.findOne({ email: email });

  console.log(findUser);

  const isAuthenticate = expectedSignature === razorpay_signature;

  const expiriyDate = new Date();
  expiriyDate.setDate(expiriyDate.getDate() + 30);

  if (isAuthenticate && findUser) {
    findUser?.payments?.push({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
      amount: 700,
      status: "Paid",
      expiresAt: expiriyDate,
    });
    findUser.currentExpiryDate = expiriyDate
    findUser.isSubscribed = true;
    await findUser.save();

    return res.json({ success: true, refernceid: razorpay_payment_id, expiriyDate: findUser.currentExpiryDate });
  }

  // res.status(200).json({ sucess: true });
};
