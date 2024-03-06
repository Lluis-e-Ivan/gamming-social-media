const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            minLength: [2, 'Username needs at least 2 chars'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [1, 'Password needs at least 1 char']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        phone: {
            type: Number
        },
        birthDate: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;