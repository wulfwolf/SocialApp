const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
  {
    follow: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("follows", FollowSchema);
