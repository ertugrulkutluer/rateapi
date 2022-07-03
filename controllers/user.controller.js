const mongoose = require("mongoose");
const Boom = require("boom");

const User = mongoose.model("User");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id }).lean();
    if(!user) return Boom.notFound("No user found.");
    res.json({
      user,
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
    return Boom.boomify(
      "An error occured."
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.paginate();
    if(!users) return Boom.notFound("No users found.");
    res.json({
      users,
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
    return Boom.boomify(
      "An error occured."
    );
  }
};
module.exports = {
  getUser,
  getUsers,
};
