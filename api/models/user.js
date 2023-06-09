const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Name" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true, default: "/sample_avatar.png"}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
