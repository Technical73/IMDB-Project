const bcrypt = require("bcrypt");
const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email_id, password } = req.body;

    if (!username || !email_id || !password) {
      return res.status(409).json({ message: "All fields are mandatory" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email_id,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({ message: "You have registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(409).json({ message: "All the fields are mandatory" });
    }

    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    let token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSize: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login Successfully", user: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out successfully" });
};

const authUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ userId: decoded.user_id });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, logout, authUser };
