const User = require('./user.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const message = require('../../config/message.config');
var config = require('../../config/main.config');

module.exports = {

    getMovieList: (userId) => {
        return new Promise((resolve, reject) => {
            User.findOne({ "_id": userId }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data.movies, message: message.SUCCESS_MESSAGE })
            })
        })
    },
    signUp: (userDetails) => {
        return new Promise((resolve, reject) => {
            User.find({ "email": userDetails.email }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                else {
                    if (data.length > 0) {
                        return reject({ status: 400, message: message.USER_EXISTS })
                    }
                    const user = new User({
                        name: userDetails.name,
                        email: userDetails.email,
                        password: userDetails.password,
                        movies: []
                    });
                    user.save().then(data => {
                        return resolve({ success: true, message: message.USER_REGISTERED_SUCCESSFULLY })
                    }).catch(err => {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    })
                }
            })
        })
    },
    login: (loginDetails) => {
        return new Promise((resolve, reject) => {
            User.findOne({ "email": loginDetails.email, "password": loginDetails.password }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                if (!data) {
                    return reject({ status: 404, message: message.NOT_FOUND })
                }
                else {
                    const token = jwt.sign({ id: data._id, role: 'student' }, config.privateKey);
                    return resolve({ success: true, token: token, userId: data._id, message: "LoggedIn Successfully" })
                }
            })

        })
    },
    addMovie: (movieDetails) => {
        return new Promise((resolve, reject) => {
            User.findOne({ "_id": movieDetails.userId }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: message.BAD_REQUEST })
                }
                if (!data) {
                    return reject({ status: 400, message: message.NOT_FOUND })
                }
                let isExist = data.movies.find(item=> item.id == movieDetails.movie.id)
                if(!isExist){
                User.updateOne({ "_id": movieDetails.userId }, {
                    $push: {
                        movies: movieDetails.movie
                    }
                }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: message.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: message.MOVIE_ADDED_SUCCESSFULLY })

                })
            }else{
                return reject({ status: 409, message: message.MOVIE_ALREADY_EXIST })
            }

            })
        })
    },
    updateMovie: (movieDetails) => {
        return new Promise((resolve, reject) => {
            User.findOne({ "_id": movieDetails.userId }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: message.BAD_REQUEST })
                }
                if (!data) {
                    return reject({ status: 400, message: message.NOT_FOUND })
                }
                User.updateOne({ "_id": movieDetails.userId, "movies._id": movieDetails.movie.movieId }, {
                    $set: {
                        'movies.$.title': movieDetails.movie.title,
                        'movies.$.overview': movieDetails.movie.overview,
                        'movies.$.vote_average': movieDetails.movie.vote_average
                    }
                }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: message.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: message.MOVIE_UPDATED_SUCCESSFULLY })

                })

            })
        })
    },
    deleteMovie: (movieDetails) => {
        return new Promise((resolve, reject) => {
            User.findOne({ "_id": movieDetails.userId }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: message.BAD_REQUEST })
                }
                if (!data) {
                    return reject({ status: 400, message: message.NOT_FOUND })
                }
                User.updateOne({ "_id": movieDetails.userId }, {
                    $pull: {
                        movies: { _id : movieDetails.movieId }
                    }
                }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: message.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: message.MOVIE_DELETED_SUCCESSFULLY })

                })
            })
        })
    },
}

