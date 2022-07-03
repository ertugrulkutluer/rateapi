const config = require("../config");
const Boom = require("boom");
const moment = require("moment");

const redisUtil = require("../utilities/redis");
const calculateRateLimit = require("../utilities/calculate.rate.limit");

module.exports = async (req, res, next) => {
  try {
    let credits = 0;
    let expire_time = 0;
    // Get the IP address
    const key = req.ip;

    // Get the how many credits will spend on this request
    const endpoint_credit = await calculateRateLimit.getRateLimits(req);

    // Check the redis cloud for the IP address
    let result = await global.redisClient.hgetall(key);

    // If there is no record for the IP address, then create a new one
    if (!result) {
      expire_time = moment().add(1, "hour").unix();
      redisUtil.create(
        key,
        {
          credits: JSON.stringify(1),
          exp: expire_time,
        },
        config.TTL // Expiration time (1 hour)
      );
      // If there is a record for the IP address, then check there is enough credits
    } else {
      expire_time = Number(JSON.parse(result.exp));
      credits = Number(JSON.parse(result.credits));
      if (
        credits >= config.IP_REQUESTS_LIMIT ||
        config.IP_REQUESTS_LIMIT - credits < endpoint_credit
      ) {
        throw Boom.tooManyRequests(
          "The hourly request limit with the IP address has been exceeded."
        );
      }
      // If there is enough credits, then increase the credit usage count
      await global.redisClient.hmset(key, {
        credits: JSON.stringify(credits + endpoint_credit),
        exp: expire_time,
      });
    }

    // To show token's rate & exp time information in response object
    res.ip_credits_left =
      config.IP_REQUESTS_LIMIT - (credits + endpoint_credit);
    res.ip_expire_time = `${moment
      .unix(expire_time)
      .diff(moment(), "minutes")} mins`;

    next();
  } catch (err) {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output);
    }
    return res.status(500).json({ message: err.message });
  }
};
