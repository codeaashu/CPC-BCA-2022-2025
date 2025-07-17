import React, { useState } from "react";
import "./AIBox.css";
// import { FaMicrophone } from "react-icons/fa"; // Font Awesome mic icon
import { FaMicrophone, FaPaperPlane, FaSearch } from "react-icons/fa";

const AIBox = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);

  
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleChat = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer || data.error);
  };

  const handleQuickTag = (tag) => {
    setQuestion(tag);
  };

  const startListening = () => {
    if (!recognition) {
      alert("Your browser doesn't support Speech Recognition.");
      return;
    }

    setIsListening(true);

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div>
      <h1 className="h1">Your Health Our Priority!</h1>
      <h2 className="h2">Get Your Order Delivered In 15 Minutes</h2>

      <div className="ai-box">
        <h2>🤖 Ask our AI Assistant</h2>

        <form className="ai-form" onSubmit={handleChat}>
          <div className="ai-input-wrapper">
            <FaSearch className="ai-icon" />

            <input
              type="text"
              placeholder="Type your health concern or say it aloud..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button
              type="button"
              className={`icon-button mic ${isListening ? "listening" : ""}`}
              onClick={startListening}
              title="Speak"
            >
              <FaMicrophone />
            </button>

            <button type="submit" className="icon-button send" title="Send">
              <FaPaperPlane />
            </button>
          </div>
        </form>

        <div className="quick-tags">
          {[
            "Headache relief",
            "Cold & flu",
            "Skin allergies",
            "Vitamin deficiency",
          ].map((tag) => (
            <button key={tag} onClick={() => handleQuickTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        {answer && (
          <p className="ai-response">
            <strong>AI answers:</strong> {answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default AIBox;
