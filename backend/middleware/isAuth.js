const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  console.log("middleware is running ********************");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, "birendra");
    req.user = decoded;
    req.isAuth = true;
    next();
  } catch (error) {
    req.isAuth = false;
    return next();
  }
};

module.exports = {
  authMiddleware,
};
