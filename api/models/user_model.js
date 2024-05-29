const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
});


userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('User', userSchema);