const express = require("express");
const { body, validationResult } = require("express-validator");
const Admin = require("../Schema/admin");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Manager = require("../Schema/manager");
const User = require("../Schema/user");
const SEC_KEY = "thisisadmin";

router.post(
  "/admin/login",
  [
    body("adminEmail").isLength({ min: 2 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let adminEmail = req.body.adminEmail;
    let password = req.body.password;

    try {
      let admin = await Admin.findOne({ adminEmail });

      if (admin) {
        let pw = await Admin.findOne({ password });
        if (pw && pw.adminEmail === admin.adminEmail) {
          let id = {
            userId: admin._id,
          };
          const token = jwt.sign(id,SEC_KEY);
          res.status(200).send({token});

        } else {
          res.status(401).send({ message: "unauthorized access" });
        }
      } else {
        res.send({ message: "please authenticate using valid credentials" });
      }
    } catch (error) {
        console.error(error)
    }
  }
);

router.post(
  "/manager/login",
  [
    body("managerEmail").isLength({ min: 2 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let managerEmail = req.body.managerEmail;
    let password = req.body.password;

    try {
      let manager = await Manager.findOne({ managerEmail });

      if (manager) {
        if ( manager.password === password) {
          let id = {
            userId: manager._id,
          };
          const token = jwt.sign(id,SEC_KEY);
          res.status(200).send({token});
        } else {
          res.status(401).send({ message: "unauthorized access" });
        }
      } else {
        res.send({ message: "please authenticate using valid credentials" });
      }
    } catch (error) {
        console.error(error)
    }
  }
);

router.post('/user/login',[
  body("userEmail").isLength({ min: 2 }),
  body("password").isLength({ min:4 }),
],async(req,res)=>{
  let userEmail = req.body.userEmail;
  let password = req.body.password ; 

  try {
    let user  = await User.findOne({userEmail});
    if (user) {
      
      if( user.password === password){
          res.status(200).send({user})
      }else{
        res.status(400).send({message:'please login using valid credentials'})
      }

    }else{
      res.send({message : 'user not found'})
    }
  } catch (error) {
      console.error(error)
  }


})

module.exports = router;
