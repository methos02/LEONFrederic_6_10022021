const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.APP_KEY);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
        return res.status(401).json({ error: new Error('Invalid request!') });
    }

    next();
};
