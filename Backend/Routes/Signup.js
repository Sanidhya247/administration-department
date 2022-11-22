const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Admin = require("../Schema/admin");
const Manager = require("../Schema/manager");
const User = require("../Schema/user");
const SEC_KEY = "thisisadmin";
const jwt = require("jsonwebtoken");
const UserRequest = require("../Schema/userRequest");
//////////////// admin sign up ///////////////////
router.post(
  "/admin/signup",
  [
    body("adminName").isLength({ min: 2 }),
    body("password").isLength({ min: 5 }),
    body("adminEmail").isEmail({ unique: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let adminEmail = req.body.adminEmail;
      let email = await Admin.findOne({ adminEmail });
      if (email) {
        res.send({ mesaage: "Email already exists! Please try another one" });
      } else {
        const admin = await Admin.create({
          adminName: req.body.adminName,
          adminEmail: adminEmail,
          password: req.body.password,
        });
        let id = {
          userId: admin._id,
        };
        const token = jwt.sign(id, SEC_KEY);
        await res.send({ token });
      }
    } catch (error) {
      res.json({ error });
      console.log(error);
    }
  }
);

//////////////// manager sign up ///////////////////
router.post(
  "/manager/signup",
  [
    body("managerName").isLength({ min: 2 }),
    body("password").isLength({ min: 5 }),
    body("managerEmail").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const manager = await Manager.create({
        managerName: req.body.managerName,
        managerEmail: req.body.managerEmail,
        password: req.body.password,
      });
      let id = {
        userId: manager._id,
      };
      const token = jwt.sign(id, SEC_KEY);
      await res.send({ token });
    } catch (error) {
      res.json({ error });
      console.log(error);
    }
  }
);
///////// user request
router.post(
  "/userrequest",
  [
    body("userRequestName").isLength({ min: 2 }),
    body("userRequestpassword").isLength({ min: 4 }),
    body("userRequestEmail").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userrequest = await UserRequest.create({
        userRequestName: req.body.userRequestName,
        userRequestEmail: req.body.userRequestEmail,
        userRequestpassword: req.body.userRequestpassword,
      });

      await res.send(userrequest);
    } catch (error) {
      res.json({ error });
      console.log(error);
    }
  }
);
//////////////// user sign up ///////////////////
router.post(
  "/user/signup",
  [
    body("userName").isLength({ min: 2 }),
    body("password").isLength({ min: 5 }),
    body("userEmail").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.create({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        password: req.body.password
      });

      await res.send(user);
    } catch (error) {
      res.json({ error });
      console.log(error);
    }
  }
);

module.exports = router;
