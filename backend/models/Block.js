const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const block_schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: null,
        },
        user_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

block_schema.index({ user_id: 1, timestamp: 1 }, { unique: true });

module.exports = mongoose.model("Block", block_schema);
