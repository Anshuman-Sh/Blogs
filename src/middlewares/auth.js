const { validateToken } = require("../services/token.services");

const checkAuth = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    // console.log(token, "token.............");

    const user = validateToken(token);
    // console.log(user, "user.............");
    req.user = user;
    return next();
  };
};

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      if (req.baseUrl === "/admin") return res.render("./admin/login");
      else if (req.baseUrl === "/user") return res.render("login");
      else return res.render("login")
    }

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  };
};

module.exports = { checkAuth, restrictTo };
