const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    favs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    adds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    lastViewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    darkMood: {
        type: Boolean,
        default: false,
    },
});

userSchema.set('toJSON', {
    virtuals: true,
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
exports.user= mongoose.model('user', userSchema);
exports.userSchema = userSchema;