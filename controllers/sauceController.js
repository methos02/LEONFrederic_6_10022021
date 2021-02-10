const Sauce = require('../models/Sauce');

exports.index = async (req, res) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

exports.show = async (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.store = async (req, res) => {
    const sauce = new Sauce(defineSauceFromReq(req));

    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ message : 'Erreur de sauce :' + error }));
};

exports.update = async  (req, res) => {
    Sauce.updateOne({ _id: req.params.id }, { ...defineSauceFromReq(req), _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.delete = (req, res) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.like = async (req, res) => {
    let sauce = await Sauce.findOne({ _id: req.params.id }).catch(error => res.status(404).json({ error }));
    const like = req.body.like;
    const user_id = req.body.userId;
    let sauce_like = { usersLiked : sauce.usersLiked, usersDisliked : sauce.usersDisliked, likes : sauce.likes, dislikes: sauce.dislikes }

    if (!isValidVote(like, user_id, sauce)) {
        return res.status(401).json({ error: 'Vous avez déjà voté!' });
    }

    await Sauce.updateOne({_id: req.params.id}, updateLikeSauce(like, user_id, sauce_like));
    return res.status(200).json({ message: 'Like update!' });
}

function defineSauceFromReq(req) {
    if(req.file) {
        return {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }

    return { ...req.body }
}

function isValidVote(like, user_id, sauce) {
    if(like === 1) { return sauce.usersLiked.indexOf(user_id) === -1; }

    if(like === -1) { return sauce.usersDisliked.indexOf(user_id) === -1; }

    return true;
}

function updateLikeSauce(like, user_id, sauce_like) {
    if(sauce_like.usersLiked.indexOf(user_id) !== -1) {
        sauce_like.likes --;
        sauce_like.usersLiked = sauce_like.usersLiked.filter(function(value){ return value !== user_id; });
    }

    if(sauce_like.usersDisliked.indexOf(user_id) !== -1) {
        sauce_like.dislikes --;
        sauce_like.usersDisliked = sauce_like.usersDisliked.filter(function(value){ return value !== user_id; });
    }

    if(like === 1) {
        sauce_like.likes ++;
        sauce_like.usersLiked.push(user_id)
        return sauce_like;
    }

    if(like === -1) {
        sauce_like.dislikes ++;
        sauce_like.usersDisliked.push(user_id);
        return sauce_like;
    }

    return sauce_like;
}
