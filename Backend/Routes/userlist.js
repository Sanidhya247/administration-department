const User = require("../Schema/user");
const Admin = require("../Schema/admin");
const express = require("express");
const jwt = require("jsonwebtoken");
const SEC_KEY = "thisisadmin";
const Manager = require("../Schema/manager");
const router = express.Router();

router.get("/getallusers", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

router.put("/edituser/:id", async (req, res) => {
  const token = req.header("auth-token");
  try {
    if (token) {
      const verification = jwt.verify(token, SEC_KEY);
      let accessId = verification.userId;

      const admin = await Admin.findById(accessId);
      const manager = await Manager.findById(accessId);

      const id = req.params.id;
      if (admin || manager) {
        let editedUser = {};
        let { userName, userEmail, password ,DOJ } = req.body;
        if (id) {
          if (userName || userEmail || DOJ ) {
            editedUser.userName = userName;
            editedUser.userEmail = userEmail;
            editedUser.DOJ = DOJ;
          } 
          console.log(editedUser);
          try {
            const user = await User.findByIdAndUpdate(
              id,
              { $set: editedUser },
              { new: true }
            );
            res.send(user);
          } catch (error) {
            console.error(error);
          }
        } else {
          res.send({ message: "enter valid url" });
        }
      } else {
        res.send({ message: "enter valid parameters" });
      }
    } else {
      res.status(400).send({ message: "please enter valid parameters" });
    }
  } catch (error) {
    res.send({ error });
    console.error(error);
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  let id = req.params.id;
  const token = req.header("auth-token");
  try {
    if (token) {
      const verification = jwt.verify(token, SEC_KEY);
      let accessId = verification.userId;

      const admin = await Admin.findById(accessId);

      if (admin) {
        if (id) {
          try {
            const user = await User.findByIdAndDelete(id);
            res.send(user);
          } catch (error) {
            console.error(error);
          }
        } else {
          res.status(404).send({ message: "enter valid parameters" });
        }
      } else {
        res.status(401).send({ message: "unauthorized access !" });
      }
    } else {
      res.status(400).send({ message: "please enter valid parameters" });
    }
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

module.exports = router;
