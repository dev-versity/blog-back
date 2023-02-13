const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: {
        type: String,
        min: 6
    }
  });

const User = mongoose.model("User", userSchema);
module.exports = User;