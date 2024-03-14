const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [1, 'Password needs at least 1 char']
        },
        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt
            .hash(this.password, 10)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.virtual('yourGames', {
    ref: 'UserGame',
    localField: '_id',
    foreignField: 'user'
})

userSchema.virtual('yourChannels', {
    ref: 'UserChannel',
    localField: '_id',
    foreignField: 'user'
})

const User = mongoose.model('User', userSchema);
module.exports = User;