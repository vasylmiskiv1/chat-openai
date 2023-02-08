import React, { useEffect, useState } from "react";

import { postMessage } from "./service/openai.js";
import { aiTemplates } from "./templates.js";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    postMessage(aiTemplates[0].order, setResponse, setResponseError, setLoader);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    postMessage(message, setResponse, setResponseError, setLoader, setMessage);
  };

  return (
    <div className="h-screen flex flex-col py-20 items-center">
      <div className="w-[600px] border border-slate-400 p-30 max-lg:max-w-[400px] px-5 py-20  rounded-lg">
        <h2 className="font-bold text-2xl text-center">
          Chat with AI Software Engineer{" "}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-20 rounded flex gap-5"
        >
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="border w-full border-neutral-200 rounded px-4 outline-none hover:border-slate-400 focus:border-slate-400 focus:"
            placeholder="How to create simple html template..."
          />
          <button
            type="submit"
            className="bg-green-200 py-2 px-6 rounded-lg transition hover:bg-green-400 duration-200"
          >
            Send
          </button>
        </form>

        {loader ? (
          <div className="mt-20 text-xl text-center">Loading...</div>
        ) : (
          <>
            {responseError ? (
              <p className="mt-5 text-red-400 text-sm">{responseError}</p>
            ) : (
              <div className="h-60 w-full overflow-auto m-auto mt-20 bg-slate-100 p-4 rounded-lg">
                {response}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
