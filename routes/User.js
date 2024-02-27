const express=require("express");
const router=express.Router();
const validator=require("../middlewares/UserMWValidator");
const bcrypt=require("bcrypt");
const { User } = require("../models/UserModel");
const Consumption = require('../models/consumptionModel');


router.post("/", validator, async (req, res) => {
  try {
    //check already
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User already registered");

    //hash the password
    let salt = await bcrypt.genSalt(10);
    let hashedPswd = await bcrypt.hash(req.body.password, salt);
    //create new user to be added to DB
    const consumptionData = await Consumption.findOne();
    user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPswd,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      consumption: consumptionData,
    });

    await user.save();

    
    //send res
    res.status(201).send(user);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("bad request..");
    }
  }
});


module.exports = router;





