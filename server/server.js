const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Ensure this matches your frontend URL
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const users = new Map();

io.on("connection", (socket) => {
    console.log(`🔗 User connected: ${socket.id}`);

    // Handle user joining a room
    socket.on("joinRoom", ({ username, room }) => {
        console.log(`✅ ${username} joined room: ${room}`);
        socket.join(room);
        users.set(socket.id, { username, room });

        // Notify others in the room
        io.to(room).emit("message", { sender: "Admin", text: `${username} joined the chat.` });
    });

    // Handle sending messages
    socket.on("sendMessage", ({ room, sender, text }) => {
        if (!room || !sender || !text) {
            console.log("❌ Error: Missing message data");
            return;
        }
        console.log(`📩 Message from ${sender} in ${room}: ${text}`);
        io.to(room).emit("message", { sender, text });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        if (user) {
            console.log(`❌ User disconnected: ${user.username} (${socket.id})`);
            io.to(user.room).emit("message", { sender: "Admin", text: `${user.username} left the chat.` });
            users.delete(socket.id);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
