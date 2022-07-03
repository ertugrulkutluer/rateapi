const mongoose = require("mongoose");
const Boom = require("boom");

const Order = mongoose.model("Order");

const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params._id }).lean();
    if (!order) return Boom.notFound("No order found.");
    res.json({
      order,
      token: {
        credit_left: res.token_credits_left,
        expires_in: res.token_expire_time,
      },
      ip: {
        credit_left: res.ip_credits_left,
        expires_in: res.ip_expire_time,
      },
    });
  } catch (err) {
    return Boom.boomify("An error occured.");
  }
};

const getOrders = async (req, res) => {
  try {
    // If want to populate users in order object
    let populate = "";
    let orders = {};
    if (req.query.populate) {
      orders = await Order.paginate({}, { populate: req.query.populate });
    } else {
      orders = await Order.paginate();
    }
    if (!orders || orders === {}) return Boom.notFound("No orders found.");
    res.json({
      orders,
      token: {
        credit_left: res.token_credits_left,
        expires_in: res.token_expire_time,
      },
      ip: {
        credit_left: res.ip_credits_left,
        expires_in: res.ip_expire_time,
      },
    });
  } catch (err) {
    return Boom.boomify("An error occured.");
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    if (!order) return Boom.boomify("An error occured while creating order.");
    return res.json({
      order,
      token: {
        credit_left: res.token_credits_left,
        expires_in: res.token_expire_time,
      },
      ip: {
        credit_left: res.ip_credits_left,
        expires_in: res.ip_expire_time,
      },
    });
  } catch (err) {
    return Boom.boomify("An error occured.");
  }
};
module.exports = {
  getOrder,
  getOrders,
  createOrder,
};
