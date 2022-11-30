const { Thought, User } = require('../models');

module.exports = {
    // /api/users
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    // Create a new thought for user
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought created but no user with this id!' })
                    : res.json({ message: 'Thought successfully created!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:thoughtId
    // Get a single thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughtData) =>
                !thoughtData ? res.status(404).json({ message: 'No thought with that ID!' }) : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update a user's thought
    updateThought(req, res) {

    },
    // Delete a user's thought
    deleteThought(req, res) {

    },
}