const Blog = require("../models/blog");

const addBlog = async (req, res) => {
  const { title, content } = req.body;

  const data = {
    title,
    content,
    createdBy: req.user._id,
  };

  if (req.file) data.coverImage = `/uploads/${req.file.filename}`;

  const blog = await Blog.create(data);

  res.redirect("/");
};

const getBlog = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findOne({ _id: blogId }).populate("createdBy");

  if (!blog)
    res.render("blog", {
      error: "No blog Found!",
    });

  res.render("blog", {
    user: req.user,
    blog,
  });

  return blog;
};

module.exports = { addBlog, getBlog };
