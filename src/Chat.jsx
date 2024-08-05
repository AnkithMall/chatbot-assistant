// src/Chat.jsx
import React from 'react';

const Chat = ({ messages }) => {
  return (
    <div className="chat">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <span>{msg.role === 'user' ? 'You' : 'Bot'}:</span> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default Chat;
