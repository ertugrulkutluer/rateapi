//Require the dev-dependencies
const app = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

//Our parent block
describe("User Endpoints", () => {
  it("GET /user should get all users", async () => {
    const res = await requestWithSupertest
      .get(`/api/v1/users/62bf6687254fd7f9f4a6dca3`)
      .set("Authorization", `Bearer ${process.env.JWT_TOKEN}`); //set header for this test
    console.log(
      res.text +
        "****************************************************************"
    );
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});
