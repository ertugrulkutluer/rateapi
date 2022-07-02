const rateLimits = require("../config/rate.limits");
const _ = require("lodash");
/**
 *
 * @param {*} req
 * @returns endpoint credit ratio
 */
module.exports.getRateLimits = async (req) => {
  if (req.baseUrl.includes("v1")) {
    const path = req.route.path.split("/")[1];
    const limits = rateLimits["v1"][`${path}`];
    const limit = _.find(limits, (l, i) => {
      return i === req.route.path;
    });
    if (limit) return limit;
    return 1;
  }
};
