import React, { useState } from "react";
import { askAI } from "../../api/chat.api";

export default function AiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await askAI(prompt);
      setResponse(response.data.answer);
    } catch (error) {
      console.error("Error asking assistant", error);
    }
  };

  return (
    <div>
      <h1>Ask Assistant</h1>
      <form onSubmit={handleAskAssistant}>
        <input
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Ask me something about the app...'
        />
        <button type='submit'>Ask</button>
      </form>
      {response && (
        <div>
          <h3>Assistant's Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
