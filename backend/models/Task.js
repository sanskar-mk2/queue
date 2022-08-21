const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const task_schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        deleted_at: {
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

module.exports = mongoose.model("Task", task_schema);
