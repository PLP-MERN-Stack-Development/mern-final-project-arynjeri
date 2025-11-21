import { useEffect, useRef, useState } from "react";
import { FaImage, FaPaperPlane, FaVideo } from "react-icons/fa";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send text message
  const sendText = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [
      ...prev,
      { type: "text", content: userMessage, sender: "user" },
    ]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Send file (image/video)
  const sendFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.startsWith("video/") ? "video" : "image";
    const url = URL.createObjectURL(file);

    // Show file locally
    setMessages((prev) => [...prev, { type, content: url, sender: "user" }]);

    // Send file to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/chat/file", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">AI Assistant</h1>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.type === "text" && <p>{msg.content}</p>}
              {msg.type === "image" && (
                <img src={msg.content} alt="user-upload" className="rounded-md" />
              )}
              {msg.type === "video" && (
                <video controls src={msg.content} className="rounded-md w-full" />
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white flex items-center gap-2 shadow-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && sendText()}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-600 hover:text-blue-500"
        >
          <FaImage size={20} />
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-600 hover:text-blue-500"
        >
          <FaVideo size={20} />
        </button>
        <button
          onClick={sendText}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          <FaPaperPlane />
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={sendFile}
          className="hidden"
          accept="image/*,video/*"
        />
      </div>
    </div>
  );
}

