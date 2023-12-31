const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
