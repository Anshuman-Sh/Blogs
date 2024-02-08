const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blogController");
const Blog = require("../models/blog");
const { restrictTo } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/", restrictTo(["USER"]), async (req, res) => {
  const allBlogs = await Blog.find({ createdBy: req.user._id });
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

router
  .route("/addBlog")
  .get((req, res) => {
    res.render("addBlog", {
      user: req.user,
    });
  })
  .post(upload.single("coverImage"), blogController.addBlog);

router.get("/blog/:blogId", blogController.getBlog);

module.exports = router;
