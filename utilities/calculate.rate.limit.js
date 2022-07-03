const rateLimits = require("../config/rate.limits");
const _ = require("lodash");
/**
 *
 * @param {*} req
 * @returns endpoint credit ratio
 */
module.exports.getRateLimits = async (req) => {
  if (req.baseUrl.split("/")[2] === "v1") {
    const method = req.method.toLowerCase();
    const limits = rateLimits["v1"][`${method}`];
    const limit = _.find(limits, (l, i) => {
      return i === req.route.path;
    });
    if (limit) return limit;
    return 1;
  }
};
