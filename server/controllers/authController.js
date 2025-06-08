const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/security");


const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email alredy in use" });
    }

    if (!firstName || !lastName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileLevel: "basic",
    });

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        profileLevel: user.profileLevel,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User has been saved",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileLevel: user.profileLevel,
      },
    });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ mesaage: "Internal server error", err });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not Found" });
    }

    const isMutch = await comparePassword(password, user.password);

    if (!isMutch) {
      return res.status(400).json({ message: "email or paswword invalid" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        profileLevel: user.profileLevel,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login succesful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileLevel: user.profileLevel,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userRegistration, userLogin };
