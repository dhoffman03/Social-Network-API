const { Schema, model } = require('mongoose');
const moment = require('moment');

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
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format('MMM Do, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true
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

// Create a virtual property 'reactionCount' that gets the length of the thoughts's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;