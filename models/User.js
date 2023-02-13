const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    email: String,
    password: {
        type: String,
        min: 6
    }
  });

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

userSchema.methods.validatePassword = async (candidatePassword, oldPassword) => {
    const result = await bcrypt.compare(candidatePassword, oldPassword)
    return result
}

const User = mongoose.model("User", userSchema);
module.exports = User;