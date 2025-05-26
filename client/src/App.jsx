import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`Enter Your Code Here`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  });

  const reviewCode = async () => {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <h1>AI Code Reviewer</h1>
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="/"> Home</a>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main">
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={20}
              style={{
                fontFamily: '"Fira code", monospace',
                fontSize: 18,
                height: "100%",
                width: "100%",
                color: "white",
              }}
            />
          </div>
          <button onClick={reviewCode}>Review Code</button>
        </div>
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
