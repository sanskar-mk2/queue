const Task = require("../models/Task");
const mongoose = require("mongoose");

const index = async (req, res) => {
    const user_id = req.user._id;
    const tasks = await Task.find({ user_id }).sort({ updated_at: 1 });
    return res.status(200).json({ tasks });
};

const store = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "missing title" });
    }
    try {
        const user_id = req.user._id;
        const task = await Task.create({ title, user_id });
        return res.status(201).json(task);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const show = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task." });
    }

    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ error: "No such task." });
    }
    return res.status(200).json(task);
};

const _delete = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task." });
    }

    const task = await Task.findOneAndUpdate(
        { _id: id },
        { deleted_at: new Date() },
        { new: true }
    );
    if (!task) {
        return res.status(404).json({ error: "No such task." });
    }

    return res.status(200).json(task);
};

const destroy = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task." });
    }

    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
        return res.status(404).json({ error: "No such task." });
    }

    return res.status(200).json(task);
};

const update = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such task." });
    }

    const task = await Task.findOneAndUpdate(
        { _id: id },
        { updated_at: new Date() },
        { new: true }
    );
    if (!task) {
        return res.status(404).json({ error: "No such task." });
    }

    return res.status(200).json(task);
};

module.exports = { store, index, show, _delete, update, destroy };
