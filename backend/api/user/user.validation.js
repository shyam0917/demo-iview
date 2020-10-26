const Joi = require('joi');

// signup validation
exports.signup = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).required(),
    });

    let data = schema.validate(req.body);

    if (data['error']) {
        let error = data['error'].details[0].message;
        return res.status(400).send({ success: false, message: error.replace(/['"]/g, '') });
    } else {
        next()
    }
}

// login validation
exports.login = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).required(),
    });

    let data = schema.validate(req.body);

    if (data['error']) {
         let error = data['error'].details[0].message;
        return res.status(400).send({ success: false, message: error.replace(/['"]/g, '') });
    } else {
        next()
    }
}

// add/update movie validation
exports.addMovie = (req, res, next) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
        movie: Joi.object().required(),
    });

    let data = schema.validate(req.body);

    if (data['error']) {
         let error = data['error'].details[0].message;
        return res.status(400).send({ success: false, message: error.replace(/['"]/g, '') });
    } else {
        next()
    }
}


// delete movie validation
exports.deleteMovie = (req, res, next) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
        movieId: Joi.string().required(),
    });

    let data = schema.validate(req.body);

    if (data['error']) {
         let error = data['error'].details[0].message;
        return res.status(400).send({ success: false, message: error.replace(/['"]/g, '') });
    } else {
        next()
    }
}


