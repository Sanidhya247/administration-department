const { Schema, default: mongoose } = require("mongoose");

const userRequestSchema = new Schema({
  userRequestName: {
    type: String,
    required: true,
  },
  userRequestpassword: {
    type: String,
    required: true,
  },
  userRequestEmail: {
    type: String,
    required: true,
  },
  userRequestDOJ: {
    type: Date,
    defailt: Date.now,
  },
});

const userrequest = mongoose.model("UserRequest", userRequestSchema);
module.exports = userrequest;
