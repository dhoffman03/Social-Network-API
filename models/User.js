const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
    {

    }
);

const User = model('user', userSchema);

module.exports = User;