const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("passport");
const { generateToken, verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: true,
    }),
    (req, res) => {

      generateToken(res, req.user._id);
      res.send(`
        <script>
          window.opener.postMessage("auth-success", "*");
          window.close();
        </script>
      `);
    }
  )
  .get("/isLoggedIn", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      return res.status(200).json({ message: "Success", data: user });
    } catch (error) {
      console.error("Error verifying user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .post("/register", authController.registerUser)
  .post("/login", authController.loginUser)
  .get("/logout", authController.logout);

module.exports = router;
