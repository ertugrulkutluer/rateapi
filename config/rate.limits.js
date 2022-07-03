module.exports = {
  v1: {
    get: {
      "/users/:_id": 1,
      "/users": 2,
      "/orders/:_id": 1,
      "/orders": 3,
    },
    post: {
      "/orders": 5,
    },
  },
};
