import React, { useState, useEffect } from 'react';
import '../styles/home.css';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/messages');
            const data = await response.json();
            setMessages(data); // assuming the backend sends an array of messages
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            fetch('http://localhost:9000/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.success) {
                    // This should add the actual message object returned from the server
                    setMessages([...messages, data.message]);
                }
                setMessage('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <h2>Home Page</h2>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg.text}</p> {/* Assuming each message has a 'text' field */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
