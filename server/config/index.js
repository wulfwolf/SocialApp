const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/socialApp2");
    console.log("connect successfully");
  } catch (error) {
    console.log("can't connect");
  }
}
module.exports = { connect };
