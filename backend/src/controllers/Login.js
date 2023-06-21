const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ msg: "Check your data  " });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Ohh no, try another email" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Ohh no, try another password" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res
        .status(200)
        .json({ msg: "Ohh Yeah, Auth finish with success", token });
    } catch (error) {
      res.status(500).json({ msg: "Error in server" });
    }
  },
};
