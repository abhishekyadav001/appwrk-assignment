const express = require("express");
const { router } = require("./route/users.route");
const { connection } = require("./config/db");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello This is Home Page");
});

app.use("/users", router);
app.listen(8080, async () => {
  try {
    await connection();
    console.log("db connected");
    console.log("listeneing port", 8080);
  } catch (error) {
    console.log(error.message);
  }
});
