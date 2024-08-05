// src/App.jsx
import React, { useState } from 'react';
import Chat from './Chat';
import MessageInput from './MessageInput';

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="App">
      <h1>Chatbot Interface</h1>
      <Chat messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default App;
