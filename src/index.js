const mongoose = require("mongoose");
const app = require("./app");
const createAdmin = require("./services/bootStrap");
const config = require("./config/config");

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("Database connected");
    createAdmin();
    app.listen(config.port, () =>
      console.log(`Server is running on PORT:${config.port}`)
    );
  })
  .catch((err) => console.log(err));
