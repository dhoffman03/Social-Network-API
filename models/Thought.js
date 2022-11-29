const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {

        },
        reactionBody: {

        },
        username: {

        },
        createdAt: {
            
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {

        },
        createdAt: {

        },
        username: {

        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;