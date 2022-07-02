const config = require("../config");
const Boom = require("boom");
const moment = require("moment");

const calculateRateLimit = require("../utilities/calculate.rate.limit");

REQUESTS_LIMIT = 100;
TTL = 60 * 60; // 3600 seconds = an hour

module.exports = async (req, res, next) => {
  try {
    let credits = 0;
    let expire_time = 0;
    // Get the token
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    // Get how many credits will spend on this request
    const endpoint_credit = await calculateRateLimit.getRateLimits(req);

    // Check the redis cloud for the token
    let result = await global.redisClient.hgetall(token);

    // If there is no record for the token, then create a new one
    if (!result) {
      expire_time = moment().add(1, "hour").unix()
      await global.redisClient.hmset(token, {
        credits: JSON.stringify(1),
        exp: expire_time,
      });
      await global.redisClient.expire(token, config.TTL); // set expiry to 1h
      // If there is a record for the token, then check there is enough credits
    } else {
      expire_time = Number(JSON.parse(result.exp));
      credits = Number(JSON.parse(result.credits));
      if (
        credits >= config.TOKEN_REQUESTS_LIMIT ||
        config.TOKEN_REQUESTS_LIMIT - credits < endpoint_credit
      ) {
        throw Boom.tooManyRequests(
          "The hourly request limit with the token has been exceeded."
        );
      }
      // If there is enough credits, then increase the credit usage count
      await global.redisClient.hmset(token, {
        credits: JSON.stringify(credits + endpoint_credit),
        exp: expire_time
      });
    }

    // To show token's rate & exp time information
    res.token_credits_left =
      config.TOKEN_REQUESTS_LIMIT - (credits + endpoint_credit);
    res.token_expire_time =  `${moment.unix(expire_time).diff(moment(), 'minutes')} mins`;

    next();
  } catch (err) {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output);
    }
    return res.status(500).json({ message: err.message });
  }
};
