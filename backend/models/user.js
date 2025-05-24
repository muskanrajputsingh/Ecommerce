const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
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
    isAdmin: {  
        type: Boolean,  
        default: false  // New users are not admins by default  
    }
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
