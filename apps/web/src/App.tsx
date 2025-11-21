import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState<string>("");
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const callApi = async () => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: "GET",
      });

      // Lấy text luôn cho dù là 200 hay 404
      const body = await res.text();

      setApiResponse(`Status: ${res.status}\nBody: ${body}`);
    } catch (err) {
      setApiResponse("Error: " + String(err));
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={callApi} style={{ marginLeft: 10 }}>
          Call API
        </button>

        {apiResponse && (
          <pre
            style={{
              marginTop: 20,
              background: "#222",
              padding: 10,
              borderRadius: 8,
              color: "#0f0",
            }}
          >
            {apiResponse}
          </pre>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
