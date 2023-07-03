const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Bus: [
    {
      type: Number,
      required: true,
    },
  ],
});

const User = mongoose.model("credentials", UserSchema);
module.exports = User;
