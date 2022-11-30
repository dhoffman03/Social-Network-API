const { User } = require('../models');

module.exports = {
    // /api/users
    // GET all users
    getUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // POST route to create new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // /api/:userId
    // GET a single user
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((userData) =>
                !userData ? res.status(404).json({ message: 'No user with that ID!' }) : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // PUT route to update current user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            })
            .then((userData) =>
                !userData ? res.status(404).json({ message: 'No user with that ID!' }) : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) =>
                !userData ? res.status(404).json({ message: 'No user with that ID!' }) : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
}