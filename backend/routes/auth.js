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
      console.log("✅ Google OAuth Success");
      console.log("Session ID:", req.sessionID);
      console.log("Cookie:", req.headers.cookie);
      console.log("User:", req.user);

      generateToken(res, req.user._id);
      res.send(`
        <script>
          window.opener.postMessage("auth-success", "*");
          window.close();
        </script>
      `);
    //   res.send(200).json({success: true});
    }
  )
  .get("/isLoggedIn", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password"); // Exclude password field if present
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Success", data: user });
    } catch (error) {
      console.error("Error verifying user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  })

  //   .get("/isLoggedIn", async (req, res) => {
  //     console.log("called");
  //     if (req.user) {
  //       console.log("called req.user");
  //       console.log(req.user);
  //       return res.status(200).json({ message: "Succes", data: req.user });
  //     } else {
  //       return res.status(401).json({ message: "Failed" });
  //     }
  //   })
  .get("/logout", authController.logout);

module.exports = router;
