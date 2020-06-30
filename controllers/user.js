const User = require("../models/user");
const successResponse = require("../utils/successResponse");
const errorResponse = require("../utils/errorResponse");

const findUsers = (filter, success, error) => {
  User.find(filter)
    .then((users) => success(users))
    .catch((err) => error(err.message));
};

module.exports.getUsers = (req, res, next) => {
  try {
    findUsers(
      { isActive: true },
      (users) => {
        res.status(200).json(successResponse(req, users));
      },
      (error) => {
        res.status(400).json(errorResponse(req, error));
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports.getUserByEmail = (req, res, next) => {
  try {
    const { email } = req.params;
    findUsers(
      { email: email, isActive: true },
      (users) => {
        res.status(200).json(successResponse(req, users));
      },
      (error) => {
        res.status(400).json(errorResponse(req, error));
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports.searchUser = (req, res, next) => {
  try {
    const { by, val } = req.query;
    if (!by || !val) {
      res.status(400).json(errorResponse(req, "Missing 'by' and/ or 'val' query string parameters"));
    } else {
      findUsers(
        { [by]: val, isActive: true },
        (users) => {
          res.status(200).json(successResponse(req, users));
        },
        (error) => {
          res.status(400).json(errorResponse(req, error));
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports.newUser = (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, landLine, addressLine1, addressLine2, city, state, zip } = req.body;
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
      isActive: true,
      createdOn: new Date(),
      createdBy: "system",
      UpdatedOn: new Date(),
      UpdatedBy: "system",
    });
    user
      .save()
      .then((result) => {
        res.status(200).json(successResponse(req, result));
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(errorResponse(req, error.message));
      });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = (req, res, next) => {
  try {
    const { id, email } = req.params;
    let filter;
    if (id) {
      filter = { _id: id };
    } else if (email) {
      filter = { email };
    } else {
      res.status(400).json(errorResponse(req, "Missing route parameter"));
    }

    const { firstName, lastName, phone, landLine, addressLine1, addressLine2, city, state, zip, isActive } = req.body;
    let update = {};
    firstName !== undefined ? (update.firstName = firstName) : null;
    lastName !== undefined ? (update.lastName = lastName) : null;
    phone !== undefined ? (update.phone = phone) : null;
    landLine !== undefined ? (update.landLine = landLine) : null;
    addressLine1 !== undefined ? (update.addressLine1 = addressLine1) : null;
    addressLine2 !== undefined ? (update.addressLine2 = addressLine2) : null;
    city !== undefined ? (update.city = city) : null;
    state !== undefined ? (update.state = state) : null;
    zip !== undefined ? (update.zip = zip) : null;
    isActive !== undefined ? (update.isActive = isActive) : null;
    update.UpdatedOn = new Date();
    update.UpdatedBy = "system";

    User.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
      .then((user) => {
        res.status(200).json(successResponse(req, user));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(req, error.message));
      });
  } catch (error) {
    next(error);
  }
};
