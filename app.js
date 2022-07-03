const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const glob = require("glob");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const redis = require("async-redis");
const jwt = require("jsonwebtoken");
const moment = require("moment");
var morgan = require('morgan')

const app = express();

const connectDBRedis = async () => {
  try {
    global.redisClient = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    global.redisClient.auth(process.env.REDIS_PASS);
    global.redisClient.on("connect", async () => {});

    global.redisClient.on("error", (err) => {
      console.error(`Redis Error ${err}`);
    });
  } catch (error) {
    console.error("Redis Cloud connection error", error);
  }
};

async function startServer() {
  try {
    // Get config vars
    dotenv.config({ path: path.resolve(__dirname + "/environments/.env") }); // This usage is necessary for MacOS users.
    const PORT = process.env.PORT;

    // Express configs
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Logger configuration
    app.use(morgan('combined'))

    // Database connection
    await mongoose.connect(process.env.MONGO_URI).catch((err) => {
      if (err) console.error("Could not connect to MongoDB: " + err);
    });

    // Bootstrap models
    const models = glob.sync("./models/**/*.js");
    models.forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    // Routes
    app.get("/", async function (req, res) {
      res.send("Hello World");
    });

    app.get("/getToken", async function (req, res) {
      const token = jwt.sign(
        {
          expiry_time: moment().valueOf(),
          credit: 100,
          role: "user",
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      res.send(token);
    });

    app.use(require("./routes"));

    // Redis connection
    try {
      await connectDBRedis();
    } catch (error) {
      console.error("Redis Cloud connection error", error);
    }

    // Start server
    app.listen(PORT);
    console.log("Server listening on port " + PORT);
  } catch (err) {
    console.log("Error starting server:", err);
  }
}
module.exports.startServer = startServer();
module.exports.app = app;
