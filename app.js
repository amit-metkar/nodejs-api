const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const errorResponse = require("./utils/errorResponse");
const logResponseTime = require("./utils/logResponseTime");
const app = express();

app.use(logResponseTime)

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use(function (err, req, res, next) {
  res.status(500).json(errorResponse(req, err));
});

app.use((req, res) => {
  res.status(404).json(errorResponse(req, "api not found"));
});

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
