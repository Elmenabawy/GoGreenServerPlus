const express = require("express");
const router = express.Router();
const validator = require("../middlewares/AuthMWValidator");
const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { User } = require("../models/UserModel");
const Consumption = require("../models/consumptionModel");

router.post("/", validator, async (req, res) => {
  try {
    const lowercaseEmail = req.body.email.toLowerCase();
    let user = await User.findOne({ email: lowercaseEmail }).exec();

    if (user) {
      return res.status(400).send("User already exists with this email.");
    }

    // Assuming you have a function to generate consumption data for a new user
    const consumptionData = generateConsumptionData();

    // Create a new Consumption document


    // Create a new User document with the reference to the Consumption document
    user = new User({
      name: req.body.name,
      email: lowercaseEmail,
      password: await bcrypt.hash(req.body.password, 10),
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      consumption: consumptionData,
    });

    await user.save();

    // If the user is created successfully, create a session for the user
    req.session.user = user;
    req.session.isAuthenticated = true;

    // Send response
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Function to generate consumption data for a new user (adjust as needed)


module.exports = router;
