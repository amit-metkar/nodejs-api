const User = require("../models/user");
const successResponse = require("../utils/successResponse");
const errorResponse = require("../utils/errorResponse");

module.exports.getUsers = (req, res, next) => {
  try {
    const { isActive, all } = req.query;
    let filter = { isActive: true }
    if (all === true) {
        filter = {}
    } else if(isActive !== undefined) {
        filter = { isActive }
    }
    User.find(filter)
      .then((users) => {
        res.status(200).json(successResponse(req, users));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(req, error.message));
      });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserById = (req, res, next) => {
    try {
      const { id } = req.params;
      if (id === undefined) {
        res.status(400).json(errorResponse(req, "Missing input parameter, id"));
      }

      User.findById(id)
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

module.exports.findUserByEmail = (req, res, next) => {
  try {
    const { email } = req.params;
    if (email === undefined) {
      res.status(400).json(errorResponse(req, "Missing input parameter, email"));
    }

    User.findOne({ email })
      .then((users) => {
        res.status(200).json(successResponse(req, users));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(req, error.message));
      });
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
      User.find({ [by]: val })
        .then((users) => {
          res.status(200).json(successResponse(req, users));
        })
        .catch((error) => {
          res.status(400).json(errorResponse(req, error.message));
        });
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
      res.status(400).json(errorResponse(req, "Missing input parameter"));
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

module.exports.deleteUser = (req, res, next) => {
  try {
    const { id, email } = req.params;
    let filter;
    if (id) {
      filter = { _id: id };
    } else if (email) {
      filter = { email };
    } else {
      res.status(400).json(errorResponse(req, "Missing input parameter"));
    }
    User.deleteOne(filter)
      .then((count) => {
        res.status(200).json(successResponse(req, count));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(req, error.message));
      });
  } catch (error) {
    next(error);
  }
};
