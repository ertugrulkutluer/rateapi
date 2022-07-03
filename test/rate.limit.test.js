//Require the dev-dependencies
const { app } = require("../app.js");
const { startServer } = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);
const mongoose = require("mongoose");
const moment = require("moment");

const redisUtil = require("../utilities/redis");

beforeAll(async () => {
  await startServer;
});

afterAll(async () => {
  await mongoose.disconnect();
  await global.redisClient.del(process.env.TEST_TOKEN);
});

describe("Rate Limit", () => {
  // Get a user and spend 2 credits
  it("GET /user should get all users", async () => {
    const res = await requestWithSupertest
      .get(`/api/v1/users/62bf6687254fd7f9f4a6dca3`)
      .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`); //set header for this test
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.user).toBeDefined();
  });

  // Spend all credits
  it("GET /user should get all users", async () => {
    redisUtil.change(process.env.TEST_TOKEN, {
      credits: JSON.stringify(200),
      exp: moment().add(1, "hour").unix(),
    });
    const res = await requestWithSupertest
      .get(`/api/v1/users/62bf6687254fd7f9f4a6dca3`)
      .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`); //set header for this test
    expect(res.status).toEqual(429);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.payload).toMatchObject({
      message: "The hourly request limit with the token has been exceeded.",
    });
  });
});
