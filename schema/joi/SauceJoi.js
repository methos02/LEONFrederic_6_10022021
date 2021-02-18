const joi = require('joi');

module.exports =  joi.object({
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
