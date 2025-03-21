const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    username: { type: String, required: true },
    room: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", ChatSchema);
