const express = require("express");
const app = express();
const port = 5000;
const connectDatabase = require('./DB');
connectDatabase();
const cors  = require('cors');

app.use(cors())
app.use(express.json())
app.use("/api/administration", require('./Routes/Signup'));
app.use("/api/administration/auth", require('./Routes/Login'));
app.use("/api/administration/user/", require('./Routes/userRequest'));
app.use("/api/administration/", require('./Routes/userlist'));

app.listen(port, () => {
  console.log(`port ${port}`);
});
