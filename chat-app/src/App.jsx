import { useState } from "react";
import Chat from "./components/Chat";
import "./styles/App.css";

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            setShowChat(true);
        }
    };

    return (
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join Chat</h3>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join</button>
                </div>
            ) : (
                <Chat username={username} room={room} />
            )}
        </div>
    );
}

export default App;
