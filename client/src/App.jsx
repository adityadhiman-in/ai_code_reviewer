import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Required for highlighting
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(`Enter Your Code Here`);
  const [review, setReview] = useState(``);

  const reviewCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data.review || response.data); // Adjust if your API structure is different
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("Something went wrong while reviewing your code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav>
        <div className="logo">
          <h1>AI Code Reviewer</h1>
        </div>
        <div className="tagline">
          <p>Welcome, Here is your AI Code Reviewer to Help You!</p>
        </div>
      </nav>
      <main className="main" style={{ display: "flex" }}>
        <div className="left" style={{ flex: 1, padding: "1rem" }}>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={20}
              style={{
                fontFamily: '"Fira code", monospace',
                fontSize: 18,
                color: "white",
                height: "500px",
                width: "100%",
                overflowY: "auto",
                backgroundColor: "#2d2d2d",
                borderRadius: "8px",
              }}
            />
          </div>
          <button onClick={reviewCode} disabled={isLoading}>
            {isLoading ? "Reviewing..." : "Review Code"}
          </button>
        </div>
        <div className="right" style={{ flex: 1, padding: "1rem" }}>
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
