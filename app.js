const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const errorHandler = require("./utils/errorHandler");
const apiNotFound = require("./utils/apiNotFound");
const logResponseTime = require("./utils/logResponseTime");

const app = express();

app.use(logResponseTime);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);

app.use(errorHandler);

app.use(apiNotFound);

app.set("port", process.env.PORT || 4200);

mongoose
  .connect("mongodb://127.0.0.1:27017/amit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const server = app.listen(app.get("port"), () => {
      console.log(`Server started on port ${server.address().port}`);
    });
  });

module.exports = app;
