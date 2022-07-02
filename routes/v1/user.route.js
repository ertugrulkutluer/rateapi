const controller = require("../../controllers/user.controller");
var router = require("express").Router();
const ipRateLimiter = require("../../middlewares/ip.rate.limiter");
const tokenRateLimiter = require("../../middlewares/token.rate.limiter");
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
Joi.objectId = require('joi-objectid')(Joi)

router.get(
  "/users/:_id",
  [
    ipRateLimiter,
    tokenRateLimiter,
    validator.params(Joi.object({
      _id: Joi.objectId().required()
    }))
  ],
  controller.getUser
);
router.get("/users", [ipRateLimiter, tokenRateLimiter], controller.getUsers);

module.exports = router;
