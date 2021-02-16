const mongoose = require('mongoose');
const joi = require('joi');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default:0 },
    dislikes: {type: Number, default:0 },
    usersLiked: {type: Array, default: [] },
    usersDisliked: {type: Array, default: [] },
});

const sauceMongoose = mongoose.model('Sauce', sauceSchema);

const sauceJoi = joi.object({
    userId: joi.string().required(),
    name: joi.string().min(3).required(),
    manufacturer: joi.string().min(3).required(),
    description: joi.string().min(20).required(),
    mainPepper: joi.string().min(3).required(),
    imageUrl: joi.string(),
    heat: joi.number().positive().required(),
    likes: joi. number().positive(),
    dislikes: joi.number().positive(),
    usersLiked: joi.array(),
    usersDisliked: joi.array(),
});

module.exports = { sauceMongoose, sauceJoi};
