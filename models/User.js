const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const joi = require('joi');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
const userMongoose = mongoose.model('User', userSchema);

const userJoi = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

module.exports = { userMongoose, userJoi};
