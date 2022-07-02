const jwt = require("jsonwebtoken");
const rate_limit = require("../utilities/calculate.rate.limit");

module.exports.authenticateToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Auth failed",
    });
  }
};
