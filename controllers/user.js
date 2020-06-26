const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).send(users);
    })
}

module.exports.newUser = (req, res, next) => {
    console.log(req.body)
    const { firstName, lastName, email, phone, landLine, addressLine1, addressLine2, city, state, zip } = req.body;
    const user = new User({ firstName, lastName, email, phone, landLine, addressLine1, addressLine2, city, state, zip })
    user.save().then(result => {
        res.status(200).send(result);
    }).catch(reason => {
        res.status(400).send(reason);
    })
}