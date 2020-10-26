var express = require('express');
const userController = require('./user.controller');
const userValidation = require('./user.validation');
const auth = require('../../middleware/authorization');
const router = express.Router();

//  add user
router.post('/signup', userValidation.signup, (req, res, next) => {
    const userDetails = req.body;
    try {
        userController.signUp(userDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  get user details
router.post('/login', userValidation.login, (req, res, next) => {
    const userDetails = req.body;
    try {
        userController.login(userDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

/* GET movie listing. */
router.get('/movies/:id',auth,function(req, res, next) {
    const userId = req.params.id;
    try {
        userController.getMovieList(userId).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }
  });

/*add movie*/
router.post('/addMovie', auth, userValidation.addMovie, function (req, res, next) {
    const movieDetails = req.body;
    try {
        userController.addMovie(movieDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

/*update movie*/
router.post('/updateMovie', auth, userValidation.addMovie, function (req, res, next) {
    const movieDetails = req.body;
    try {
        userController.updateMovie(movieDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

/*delete movie*/
router.post('/deleteMovie', auth, userValidation.deleteMovie, function (req, res, next) {
    const movieDetails = req.body;
    try {
        userController.deleteMovie(movieDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


module.exports = router;