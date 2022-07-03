module.exports = {
  create: async (key, data, expire_time) => {
    await global.redisClient.hmset(key, data);
    await global.redisClient.expire(key, expire_time);
  },
  delete: async (key) => {
    await global.redisClient.del(key);
  },
  change: async (key, value) => {
    await global.redisClient.hmset(key, value);
  }
};
