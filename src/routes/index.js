const express = require("express");
const router = express.Router();
const blogRoutes = require("./blogs.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");

const defaultRoutes = [
  {
    path: "/admin",
    routes: adminRoutes,
  },
  {
    path: "/user",
    routes: userRoutes,
  },
  {
    path: "/",
    routes: blogRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
