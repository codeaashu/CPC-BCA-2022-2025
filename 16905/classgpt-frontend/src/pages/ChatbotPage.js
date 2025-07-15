import React, { useState, useRef, useEffect } from 'react';

function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Namaste! Aap apne notes ki koi bhi line likho, main Hinglish me explain karta hoon 🎓',
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const aiMessage = {
      role: 'ai',
      text: `📘 Explanation: "${input}" ka matlab ye hai... \n(Yaha AI output aayega Hinglish me with examples)`,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0d0c1d] dark:text-white px-4 py-8 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-4 text-purple-700 dark:text-purple-400">
        🧠 Ask from Notes
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Type any line or concept from your notes to get Hinglish explanation with examples.
      </p>

      {/* Chat Window */}
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-[#1a182d] p-4 rounded-lg h-[500px] overflow-y-auto shadow-md mb-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'ml-auto bg-purple-600 text-white text-right'
                : 'mr-auto bg-gray-300 text-gray-900 dark:bg-[#2a2740] dark:text-gray-300'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto flex gap-3">
        <input
          type="text"
          placeholder="Ask something from your notes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded border border-purple-500 bg-white text-black dark:bg-[#1a182d] dark:text-white"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatbotPage;
