const controller = require("../../controllers/order.controller");
var router = require("express").Router();
const ipRateLimiter = require("../../middlewares/ip.rate.limiter");
const tokenRateLimiter = require("../../middlewares/token.rate.limiter");

router.get("/orders/:_id", [ipRateLimiter,tokenRateLimiter], controller.getUser);
router.get("/orders", [ipRateLimiter,tokenRateLimiter], controller.getUsers);

module.exports = router;
