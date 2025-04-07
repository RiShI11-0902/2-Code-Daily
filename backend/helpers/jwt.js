const jwt = require("jsonwebtoken");
exports.generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "7d",
  });
  console.log("token", token);

  res.cookie("token", token, {
    httpOnly: true, // safe from xss attacks
    secure: false, ///process.env.NODE_ENV === "production"
    sameSite: "none", // safe from attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

exports.verifyToken = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.token;
  console.log(token);

  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorised u fool" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorised - Invalid Token " });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
