import React, { useState } from "react";

const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  async function generateLetter() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: `Write a formal letter for: ${prompt}` }]
      })
    });

    const data = await response.json();
    setGeneratedLetter(data.choices[0].message.content);
  }

  return (
    <div className="ai-generator">
      <h2>AI Letter Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your request (e.g., 'Write a leave letter for two days')"
      />
      <button onClick={generateLetter}>Generate</button>
      {generatedLetter && <div className="letter-output">{generatedLetter}</div>}
    </div>
  );
};

export default AIGenerator;
