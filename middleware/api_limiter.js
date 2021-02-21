/**
 * Middleware de restriction de tentative de connection.
 */
const rateLimit = require("express-rate-limit");

function login_limiter() {
    return rateLimit({
        skipSuccessfulRequests: true,
        windowMs: 15 * 60 * 1000,
        max: 3,
        message: "Vous avez fait trop d'essai, veuillez patienter une heure."
    })
}

module.exports = { login_limiter }
