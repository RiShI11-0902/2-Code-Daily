const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
      password, // gets hashed automatically because of pre-save hook
    });

    generateToken(res, newUser._id);

    await newUser.save();

    res
      .status(200)
      .json({ message: "User Registered Successfully Kindly Log In", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT (optional)
    // const token = generateToken(user._id);

    generateToken(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: user
      // token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

exports.logout = (req, res, next) => {

  req.logout(req.user, (err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("connect.sid");
    res.clearCookie("token");
    // res.redirect("/");
    res.status(200).json({ message: "success" });
  });
};
