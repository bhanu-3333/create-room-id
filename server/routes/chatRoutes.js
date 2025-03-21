const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

router.get("/:room", async (req, res) => {
    try {
        const messages = await Chat.find({ room: req.params.room }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
