import React, { useState, useEffect } from "react";
import { sendMessage, onMessage } from "../websocketService";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSend = () => {
    sendMessage(input);
    setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((msg, index) => (
          <div key={index} className="my-2 p-2 bg-gray-200 rounded">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-gray-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
