import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] mt-20 rounded flex gap-10"
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border w-full border-neutral-700 rounded"
        />
        <button type="submit" className="bg-green-200 py-2 px-4">Send</button>
      </form>
      <div className="mt-10">{response}</div>
    </div>
  );
}

export default App;
