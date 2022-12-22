const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
    },
    shares: {
      type: Array,
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

module.exports = mongoose.model("posts", PostSchema);
