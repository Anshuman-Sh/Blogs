const Admin = require("../models/admin");
const Blog = require("../models/blog");
const User = require("../models/user");
const { generateToken } = require("../services/token.services");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.isPasswordMatch(email, password);

    const token = generateToken(admin);

    res.cookie("token", token).redirect("/admin/dashboard");
  } catch (error) {
    res.render("./admin/login", { error: "Incorrect Email or Password" });
  }
};

const dashboard = async (req, res) => {
  const allUsersBlogs = await Blog.find({}).populate("createdBy");
  const users = await User.find({});
  res.render("./admin/dashboard", {
    blogs: allUsersBlogs,
    users: users,
  });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const admin = await Admin.isPasswordMatch(req.user.email, oldPassword);

    if (newPassword !== confirmPassword) {
      res.render("./admin/changePassword", {
        error: "Confirm password does not match!",
      });
    }

    let updatedPassword = { password: newPassword };
    Object.assign(admin, updatedPassword);
    await admin.save();

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.render("./admin/changePassword", { error: "Incorrect Password" });
  }
};

module.exports = { adminLogin, dashboard, changePassword };
