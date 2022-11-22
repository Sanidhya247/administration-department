const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  DOJ: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
