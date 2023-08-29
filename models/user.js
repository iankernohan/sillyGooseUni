const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    major: {
        type: String
    },
    minor: {
        type: String
    },
    profilePicture: {
        type: String,
        default: 'img/userImage.jpg'
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);