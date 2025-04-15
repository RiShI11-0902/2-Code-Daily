const User = require("../models/user");
const { instance } = require("../paymentConfig/razorpayConfig");
const crypto = require("node:crypto");

exports.getKey = async = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_TEST_ID });
  } catch (error) {
    console.log(error);
  }
};
exports.checkout = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    const totalUsers = await User.countDocuments();

    let amount = "0";

    if (findUser.earlySubscriber || totalUsers <= 100) {
      amount = "10000"; // ₹100
      findUser.earlySubscriber = true;
    } else {
      amount = "60000"; // ₹600
    }

    findUser.lastPaymentAmount = amount;
    await findUser.save();

    const options = {
      amount: Number(amount),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({
      success: false,
      message: "Checkout failed. Please try again later.",
    });
  }
};


exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, email } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isAuthenticate = expectedSignature === razorpay_signature;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    if (isAuthenticate) {
      findUser.payments.push({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        amount: Number(findUser.lastPaymentAmount), 
        status: "Paid",
        expiresAt: expiryDate,
      });

      findUser.currentExpiryDate = expiryDate;
      findUser.isSubscribed = true;
      findUser.lastPaymentAmount = undefined; 
      await findUser.save();

      return res.status(200).json({
        success: true,
        refernceid: razorpay_payment_id,
        expiriyDate: findUser.currentExpiryDate,
        user: findUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature. Verification failed.",
      });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed. Please try again later.",
    });
  }
};

