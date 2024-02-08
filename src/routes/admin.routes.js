const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { restrictTo } = require("../middlewares/auth");

router
  .route("/login")
  .get(restrictTo(["ADMIN"]), (req, res) => {
    res.render("./admin/login");
  })
  .post(adminController.adminLogin);

router.get("/dashboard", restrictTo(["ADMIN"]), adminController.dashboard);

router
  .route("/changePassword")
  .get((req, res) => {
    res.render("./admin/changePassword");
  })
  .post(adminController.changePassword);

router.get("/logout", (req, res) => {
  res.clearCookie("token").render("./admin/login");
});

module.exports = router;
