const fs = require('fs');

module.exports = function validate(joiSchema, model) {
    return (req, res, next) => {
        const paramValid = joiSchema.validate(defineDataFromReq(req, model));

        if(paramValid.error !== undefined) {
            if(req.file) fs.unlink(fs.realpathSync(req.file.path), (err) => { if (err) throw err; });
            return res.status(400).json( paramValid.error );
        }

        req.valideData = paramValid.value;

        if(req.file) {
            fs.rename(fs.realpathSync(req.file.path), fs.realpathSync(req.file.path).replace('\\temp', ''), (err) => { if (err) throw err; });
        }

        next();
    }
}

function defineDataFromReq(req, model) {
    if(req.file) {
        return {
            ...JSON.parse(req.body[model]),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }

    return { ...req.body }
}
