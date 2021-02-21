/**
 * Schéma de validation Joi pour les Utilisateurs
 */

const joi = require('joi');

module.exports = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});
