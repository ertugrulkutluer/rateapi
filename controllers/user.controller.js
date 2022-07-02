const mongoose = require("mongoose");
const User = mongoose.model("User");

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id }).lean();
  res.json({
    user,
    token: {
      credit_left: res.token_credits_left,
      expires_in: res.token_expire_time
    },
    ip:{
      credit_left: res.ip_credits_left,
      expires_in: res.ip_expire_time
    }
  });
};
// For View
const getUsers = async (req, res) => {
  const users = await User.paginate();
  res.json({ users });
};
module.exports = {
  getUser,
  getUsers,
};
