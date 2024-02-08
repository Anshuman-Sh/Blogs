const mongoose = require("mongoose");
const { randomBytes, createHmac } = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: { type: String },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN"],
      default: "ADMIN",
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(admin.password)
      .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
  }

  next();
});

adminSchema.static("isPasswordMatch", async function (email, password) {
  const admin = await this.findOne({ email });
  if (!admin) throw new Error("Admin not found");

  const salt = admin.salt;
  const hashedPassword = admin.password;

  const adminProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (adminProvidedHash !== hashedPassword)
    throw new Error("Incorrect Password");

  return admin;
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
