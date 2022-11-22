const { Schema, default: mongoose } = require("mongoose");

const managerSchema = new Schema({
  managerName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  managerEmail: {
    type: String,
    required: true,
  },
});

const manager = mongoose.model("Manager", managerSchema);
module.exports = manager;
