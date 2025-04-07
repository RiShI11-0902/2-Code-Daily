const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("passport");
router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate(
      "google",
      {
        failureRedirect: "/",
      },
      (req, res) => {
        console.log("✅ Google OAuth Success");
        console.log("Session ID:", req.sessionID);
        console.log("User:", req.user);

        // Now the session is established and cookie should be set
        res.redirect("https://2-code-daily.netlify.app/dashboard");
      }
    )
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
