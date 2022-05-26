var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserSchema = new Schema({
    Usuario:{type:String, unique:true},
	Email:{type:String},
    Password:{type:String},
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.Password, 10, (error, hash) => {
        user.Password = hash
        next()
    });
});

module.exports = mongoose.model('User', UserSchema);