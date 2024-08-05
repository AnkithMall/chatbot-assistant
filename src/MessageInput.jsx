import React, { useState, useEffect } from 'react';

const MessageInput = ({ addMessage }) => {
  const [input, setInput] = useState('');
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    const createThread = async () => {
      try {
        // Replace with your actual API endpoint to create a thread
        const response = await fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'
          },
          body: '' // Ensure valid JSON body
        });

        if (response.ok) {
          const data = await response.json();
          setThreadId(data.id);  // Set the thread ID in state
          console.log("Thread created successfully:", data);
        } else {
          const errorData = await response.json();
          console.error('Failed to create thread:', errorData);
        }
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    };

    createThread(); // Ensure this function is called immediately on mount
  }, []); // Dependency array ensures this effect runs only once on mount

  const sanitizeInput = (input) => {
    return input.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters
  };

  const handleSendMessage = async () => {
    if (input.trim() && threadId) {
      const sanitizedInput = sanitizeInput(input);
      const userMessage = { role: 'user', content: sanitizedInput };
      addMessage(userMessage);

      try {
        // Send the message along with the thread_id
        const response = await fetch('https://hook.eu2.make.com/natoibtfbqqqsgb3df7bxd1r0m91redm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ thread_id: threadId, message: sanitizedInput }),
        });

        if (response.ok) {
          const data = await response.json();
          const botMessage = { role: 'bot', content: data.message };
          addMessage(botMessage);
        } else {
          const errorData = await response.json();
          console.error('Failed to send message:', errorData);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        disabled={!threadId}  // Disable input until thread is created
      />
      <button onClick={handleSendMessage} disabled={!threadId}>Send</button>
    </div>
  );
};

export default MessageInput;
