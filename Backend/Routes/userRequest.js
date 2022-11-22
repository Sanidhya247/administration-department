const express = require("express");
const UserRequest = require("../Schema/userRequest");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../Schema/admin");
const User = require("../Schema/user");
const SEC_KEY = "thisisadmin";

router.get("/allrequestuser", async (req, res) => {
  let authToken = req.header("auth-token");
  if (authToken) {
    try {
      const verification = jwt.verify(authToken, SEC_KEY);
      let admin = await Admin.findById(verification.userId);
      console.log(admin)
      
      if (admin) {
        let userRequests = await UserRequest.find();
        res.status(200).send({ userRequests });
      } else {
        res.send({ message: "only admin and manager can access it" });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: "access denied" });
    }
  } else {
    res.send("please authenticate using valid token");
  }
});

router.delete("/deleteuserrequest/:id",async (req, res) => {
  let id = req.params.id;
  let authToken = req.header('auth-token');
  if(authToken){
    const verification = jwt.verify(authToken, SEC_KEY);
    let admin = await Admin.findById(verification.userId);
    if(admin){
      try {
        if (id) {
          let userRequest  = await UserRequest.findByIdAndDelete(req.params.id);
          res.send({message:'User request deleted successfully...'})
        }else{
          res.status(404).send({message:'not found please enter valid parameter'})
        }
      } catch (error) {
        console.error(error)
      }
    }else{
      res.status(401).send({message : 'unauthorized access!'})
    }
   
  }else{
    res.status(400).send({message : 'please enter valid parameters'})
  }
 
});

module.exports = router;
