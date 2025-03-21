import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);  // Track if user has joined

    useEffect(() => {
        socket.on("message", (message) => {
            console.log("📩 Message received:", message);
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const joinRoom = () => {
        if (username.trim() && room.trim()) {
            console.log(`🔗 Joining room: ${room} as ${username}`);
            socket.emit("joinRoom", { username, room });
            setJoined(true);  // Mark as joined
        } else {
            alert("Please enter username and room!");
        }
    };

    const sendMessage = () => {
        if (!joined) {
            alert("You must join a room first!");
            return;
        }

        if (input.trim()) {
            console.log(`📤 Sending message: ${input}`);
            socket.emit("sendMessage", { room, sender: username, text: input });
            setInput(""); 
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Chat Room</h1>

            {!joined ? (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Room ID"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <div>
                    <p><strong>Joined as:</strong> {username} in room <strong>{room}</strong></p>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}

            <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
