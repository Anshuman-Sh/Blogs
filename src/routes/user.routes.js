const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(userController.signup);

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(userController.login);

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/user/login");
});

module.exports = router;
