const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default:0 },
    dislikes: {type: Number, default:0 },
    usersLiked: {type: String, default:[], get: parse, set: stringify},
    usersDisliked: {type: String, default:[], get: parse, set: stringify },
});

function parse(val) { return JSON.parse(val); }
function stringify(val) { return JSON.stringify(val); }

module.exports = mongoose.model('Sauce', sauceSchema);
