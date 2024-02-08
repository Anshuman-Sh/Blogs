const User = require("../models/user");
const { generateToken } = require("../services/token.services");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (await User.findOne({ email: email })) {
    return res.render("signup", {
      error: "Email already in use, Please try with other email",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const token = generateToken(user);

  res.cookie("token", token).redirect("/");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.matchPassword(email, password);

    const token = generateToken(user);

    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("login", { error: "Incorrect Email or Password" });
  }
};

module.exports = { signup, login };
