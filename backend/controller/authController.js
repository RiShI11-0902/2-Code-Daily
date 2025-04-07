exports.logout = (req, res, next) => {
    console.log("log outtttt");
  
    req.logout(req.user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("Suucess");
  
      res.clearCookie("connect.sid");
      res.clearCookie("token");
      // res.redirect("/");
      res.status(200).json({ message: "success" });
    });
  };