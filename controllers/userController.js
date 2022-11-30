const { User } = require('../models');

module.exports = {
    // /api/users
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // Create new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // /api/:userId
    // Get a single user
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update current user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            })
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId/friends/:friendId
    // Add a friend to 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            {
                new: true,
                runValidators: true,
            })
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            {
                new: true,
                runValidators: true,
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that ID!' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $pull: { friends: req.params.userId } },
                    {
                        new: true,
                        runValidators: true,
                    })
                    .then((deletedFriend) =>
                        !deletedFriend
                            ? res.status(404).json({ message: 'No user with that frienId!' })
                            : res.json({ message: 'Successfully deleted friend!' })
                    )
                    .catch(err => res.json(err));
            })
            .catch((err) => res.status(500).json(err));
    }
}