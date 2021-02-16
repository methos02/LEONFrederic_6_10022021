const User = require('../models/User').userMongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const Str = require('@supercharge/strings')salt: Str.random(50);

exports.signup = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10).catch(error => res.status(500).json({ error }));
    const user = new User({ email: req.body.email,  password: hash });

    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    ;
};

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).catch(error => res.status(500).json({ error }));
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect!' });
    }

    const valid = await bcrypt.compare(req.body.password, user.password).catch(error => res.status(500).json({ error }));
    if (!valid) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect!' });
    }

    const token = jwt.sign( { userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
    res.status(200).json({ userId: user._id, token: token });
};
