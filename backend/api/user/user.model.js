const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    movies:[{
        "id": Number,
        "vote_count": Number,
        "video": Boolean,
        "vote_average": Number,
        "title": String,
        "popularity": Number,
        "poster_path": String,
        "original_language": String,
        "original_title": String,
        "genre_ids": [],
        "backdrop_path": String,
        "adult": Boolean,
        "overview": String,
        "release_date": String
}],
},{ timestamps: true });

// Export the model
module.exports = mongoose.model('User', UserSchema);