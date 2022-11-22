const { Schema, default: mongoose } = require("mongoose");

const adminSchema = new Schema({
  adminName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique:true
  },
});

const admin = mongoose.model("Admin", adminSchema);
module.exports = admin;
