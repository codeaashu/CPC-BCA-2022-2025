import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 max-w-2xl mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-[#1a182d] text-white px-4 py-2 rounded-lg outline-none"
        placeholder="Ask something from your notes..."
      />
      <button
        type="submit"
        className="bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
