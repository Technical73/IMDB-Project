const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  authUser,
} = require("../controllers/authControllers");
const authValidate = require("../middlewares/authMiddlewares");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", authValidate, logout);
router.get("/auth/me", authUser);

module.exports = router;
