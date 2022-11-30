const { User, Thought } = require('../models');

module.exports = {
    // /api/users
    // GET all users
    getUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    }

    

    // createUser


    // /api/:userId
    // getUserById
    // updateUser
    // deleteUser
}