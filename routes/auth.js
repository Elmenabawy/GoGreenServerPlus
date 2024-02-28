const express = require("express");
const router = express.Router();
const validator = require("../middlewares/AuthMWValidator");
const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User } = require("../models/UserModel");


router.post("/", validator, async (req, res) => {
  try {
    const lowercaseEmail = req.body.email.toLowerCase();
    let user = await User.findOne({ email: lowercaseEmail }).exec();

    if (!user) {
      return res.status(400).send("Invalid email or password..");
    }

    const validPswrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPswrd) {
      return res.status(400).send("Invalid email or password..");
    }

    // If the user is found and the password is correct, create a session for the user
    req.session.user = user;
    req.session.isAuthenticated = true;

    //send res
    res.status(200).send(user);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad request..");
    }
  }
});

// Function to generate consumption data for a new user (adjust as needed)


module.exports = router;
