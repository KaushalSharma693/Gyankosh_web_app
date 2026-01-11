// frontend/src/components/Chatbot.jsx
import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.text }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
  } catch (err) {
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: '⚠️ Server not reachable.' }
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="chatbot">
      <h2>Library AI Assistant</h2>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="message bot">Typing...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about the library..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
