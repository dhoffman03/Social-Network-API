const { Thought, User } = require('../models');

module.exports = {
    // /api/thoughts
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
    // /api/thoughts/:thoughtId
    // Get a single thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update a user's thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user's thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with that ID!' })
                }
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json({ thoughtData })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            {
                new: true,
                runValidators: true,
            })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/thoughts/:thoughtId/reactions
    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId } } },
            {
                new: true,
                runValidators: true,
            })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
};