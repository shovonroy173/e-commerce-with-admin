const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  console.log("AT 29", req.body);

  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("AT 29", user);
    if(!user )  return res.status(401).json("User not exists");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if(originalPassword != inputPassword) 
     return res.status(401).json("Wrong Credentials");

    const { password, ...others } = user._doc;

    const accesssToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

   return res.status(201).json({ ...others, accesssToken });
  } catch (err) {
    console.log("LINE AT 60" , err);
    return res.status(500).json(err);
  }
});

module.exports = router;
