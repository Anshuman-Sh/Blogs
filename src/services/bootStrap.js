const Admin = require("../models/admin");

const createAdmin = async () => {
  let password = "Adminhoonmai";

  const updateAdminDetails = {
    name: "Anshuman Sharma",
    email: "anshuman17sharma09@gmail.com",
    $setOnInsert: { password },
  };

  const createAdminDetails = {
    name: "Anshuman Sharma",
    email: "anshuman17sharma09@gmail.com",
    password: password,
  };

  try {
    let adminData = await Admin.findOne({ email: updateAdminDetails.email });

    if (!adminData) {
      await Admin.create(createAdminDetails);
    } else {
      await Admin.updateOne(
        { email: updateAdminDetails.email },
        updateAdminDetails
      );
    }
  } catch (err) {
    console.log("Error.................", err);
  }
};

module.exports = createAdmin;
