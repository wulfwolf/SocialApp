const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    // followers: {
    //   type: Array,
    // },
    // followings: {
    //   type: Array,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
