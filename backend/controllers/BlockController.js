const Block = require("../models/Block");
const mongoose = require("mongoose");
const validator = require("validator");

const index = async (req, res) => {
    const user_id = req.user._id;
    const blocks = await Block.find({ user_id });
    return res.status(200).json({ blocks });
};

const store = async (req, res) => {
    const user_id = req.user._id;
    const { title, timestamp } = req.body;
    if (!title || !timestamp) {
        return res.status(400).json({ error: "missing title or timestamp" });
    }
    if (!validator.isISO8601(timestamp)) {
        return res
            .status(400)
            .json({ error: "please enter a valid timestamp" });
    }
    if (await Block.findOne({ user_id, timestamp })) {
        return res
            .status(400)
            .json({ error: "this timestamp already exitsts for the user" });
    }
    try {
        const block = await Block.create({ title, user_id, timestamp });
        return res.status(201).json(block);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const show = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such block." });
    }

    const block = await Block.findById(id);
    if (!block) {
        return res.status(404).json({ error: "No such block." });
    }
    return res.status(200).json(block);
};

const destroy = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such block." });
    }

    const block = await Block.findOne({ _id: id });
    if (!block) {
        return res.status(404).json({ error: "No such block." });
    }

    if (!user_id.equals(block.user_id)) {
        return res
            .status(401)
            .json({ error: "This block does not belong to this user" });
    }

    await block.delete();

    return res.status(200).json(block);
};

const update = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such block." });
    }

    const block = await Block.findOne({ _id: id });
    if (!block) {
        return res.status(404).json({ error: "No such block." });
    }

    const user_id = req.user._id;

    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "missing title" });
    }

    if (!user_id.equals(block.user_id)) {
        return res
            .status(401)
            .json({ error: "This block does not belong to this user" });
    }

    await block.updateOne({ title });
    const updated_block = await Block.findById(id);
    return res.status(200).json(updated_block);
};

const upsert = async (req, res) => {
    const { title, timestamp } = req.body;
    const user_id = req.user._id;
    if (!title || !timestamp) {
        return res.status(400).json({ error: "missing title or timestamp" });
    }

    if (!validator.isISO8601(timestamp)) {
        return res
            .status(400)
            .json({ error: "please enter a valid timestamp" });
    }

    const block = await Block.findOne({ user_id, timestamp });
    if (!block) {
        try {
            const block = await Block.create({ title, user_id, timestamp });
            return res.status(201).json(block);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    if (block) {
        await block.updateOne({ title });
        const updated_block = await Block.findById(block._id);
        return res.status(200).json(updated_block);
    }
};

module.exports = { store, index, show, destroy, update, upsert };
