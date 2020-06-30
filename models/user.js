const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    phone: String,
    landLine: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zip: String,
    isActive: Boolean,
    createdOn: Date,
    createdBy: String,
    UpdatedOn: Date,
    UpdatedBy: String
})

module.exports = mongoose.model('User', userSchema);