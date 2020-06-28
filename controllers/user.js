const User = require("../models/user");
const successResponse = require("../utils/successResponse");
const errorResponse = require("../utils/errorResponse");

module.exports.getUsers = (req, res, next) => {
  try {
    User.find()
      .then((users) => {
        res.status(200).json(successResponse(users));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(error.message));
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserByEmail = (req, res, next) => {
  try {
    const { email } = req.params;
    User.find({ email })
      .then((user) => {
        res.status(200).json(successResponse(user));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(error.message));
      });
  } catch (error) {
    next(error);
  }
};

module.exports.searchUser = (req, res, next) => {
  try {
    const { by, val } = req.query;
    if (!by || !val) {
      res
        .status(400)
        .json(
          errorResponse("Missing 'by' and/ or 'val' query string parameters")
        );
    } else {
      User.find({ [by]: val })
        .then((user) => {
          res.status(200).json(successResponse(user));
        })
        .catch((error) => {
          res.status(400).json(errorResponse(error.message));
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.newUser = (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      landLine,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      landLine,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
    });
    user
      .save()
      .then((result) => {
        res.status(200).json(successResponse(result));
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(errorResponse(error.message));
      });
  } catch (error) {
    next(error);
  }
};
