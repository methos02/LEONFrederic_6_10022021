const Sauce = require('../models/Sauce').sauceMongoose;
const fs = require('fs');

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

    if (!isValidVote(sauce, req.body.like, req.body.userId )) {
        return res.status(401).json({ error: new Error('Vous avez déjà voté!') });
    }

    await Sauce.updateOne({_id: req.params.id}, updateLikeSauce(req.body.like, req.body.userId, sauce));
    return res.status(200).json({ message: 'Like update!' });
}

function defineSauceFromReq(req) {
    if(req.file) {
        fs.rename(fs.realpathSync(req.file.path), fs.realpathSync(req.file.path).replace('\\temp', ''), (err) => { if (err) throw err; });

        return {
            ...JSON.parse(req.body['sauce']),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }

    return { ...req.body }
}

function isValidVote( sauce, like, user_id ) {
    if(like === 1) { return sauce.usersLiked.indexOf(user_id) === -1; }

    if(like === -1) { return sauce.usersDisliked.indexOf(user_id) === -1; }

    return true;
}

function updateLikeSauce(like, user_id, sauce) {
    if(sauce.usersLiked.indexOf(user_id) !== -1) {
        sauce.likes --;
        sauce.usersLiked = sauce.usersLiked.filter(function(value){ return value !== user_id; });
    }

    if(sauce.usersDisliked.indexOf(user_id) !== -1) {
        sauce.dislikes --;
        sauce.usersDisliked = sauce.usersDisliked.filter(function(value){ return value !== user_id; });
    }

    if(like === 1) {
        sauce.likes ++;
        sauce.usersLiked.push(user_id)
        return sauce;
    }

    if(like === -1) {
        sauce.dislikes ++;
        sauce.usersDisliked.push(user_id);
        return sauce;
    }

    return sauce;
}
