const controller = require("../../controllers/order.controller");
var router = require("express").Router();
const ipRateLimiter = require("../../middlewares/ip.rate.limiter");
const tokenRateLimiter = require("../../middlewares/token.rate.limiter");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
Joi.objectId = require("joi-objectid")(Joi);

router.get(
  "/orders/:_id",
  [ipRateLimiter, tokenRateLimiter],
  controller.getOrder
);
router.get(
  "/orders",
  [
    ipRateLimiter,
    tokenRateLimiter,
    validator.query(
      Joi.object({
        populate: Joi.string(),
      })
    ),
  ],
  controller.getOrders
);
router.post(
  "/orders",
  [
    ipRateLimiter,
    tokenRateLimiter,
    validator.body(
      Joi.object({
        items: Joi.array(),
        user: Joi.objectId().required(),
        delivered: Joi.bool(),
      })
    ),
  ],
  controller.createOrder
);
module.exports = router;
