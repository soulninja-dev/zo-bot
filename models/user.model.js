const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: {
    type: Number,
    required: true,
  },
  walletid: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
