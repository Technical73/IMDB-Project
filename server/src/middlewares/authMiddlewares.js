const jwt = require("jsonwebtoken");

const authValidate = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authValidate;
