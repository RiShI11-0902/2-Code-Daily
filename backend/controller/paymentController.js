const User = require("../models/user");
const { instance } = require("../paymentConfig/razorpayConfig");
const crypto = require("node:crypto");

exports.getKey = async = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
    res.status(400).json({ error: "Internal Server Error" });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { email, plan } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Plan-based pricing in paise (₹1 = 100 paise)
    const pricing = {
      Regular: 59900,
      Early: 84900,
    };

    const interviews = {
      Regular: 5,
      Early: 5,
    };

    const amount = pricing[plan];
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
      });
    }

    // Save selected plan and amount temporarily before payment confirmation
    findUser.lastPaymentAmount = amount;
    findUser.selectedPlan = plan;
    await findUser.save();

    const options = {
      amount,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      notes: { plan },
      // OPTIONAL: shows approx $ value on Razorpay checkout
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Checkout failed. Please try again later.",
    });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      email,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isAuthenticate = expectedSignature === razorpay_signature;

    if (isAuthenticate) {
      const plan = findUser.selectedPlan;
      const amount = findUser.lastPaymentAmount;
      const totalInterviews = {
        Regular: 100,
        Early: Number.MAX_SAFE_INTEGER,
      }[plan] ?? 0;

      findUser.payments.push({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        amount: Number(amount),
        status: "Paid",
        expiresAt: null, // not time-bound anymore
        planName: plan,
        totalInterviews,
        usedInterviews: 0,
      });

      findUser.isSubscribed = true;
      findUser.lastPaymentAmount = undefined;
      findUser.selectedPlan = undefined;

      await findUser.save();

      return res.status(200).json({
        success: true,
        referenceId: razorpay_payment_id,
        user: findUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature. Verification failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed. Please try again later.",
    });
  }
};
