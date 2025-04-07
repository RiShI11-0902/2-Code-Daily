const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt");
router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: true
    }),
    (req, res) => {
      console.log("✅ Google OAuth Success");
      console.log("Session ID:", req.sessionID);
      console.log("Cookie:", req.headers.cookie);
      console.log("User:", req.user);

      generateToken(res,req.user._id)
  
      res.redirect("https://2-code-daily.netlify.app/dashboard");
    }
  )  
  .get("/isLoggedIn", async (req, res) => {
    console.log("called");
    if (req.user) {
      console.log("called req.user");
      console.log(req.user);
      return res.status(200).json({ message: "Succes", data: req.user });
    } else {
      return res.status(401).json({ message: "Failed" });
    }
  })
  .get("/logout", authController.logout);

module.exports = router;
