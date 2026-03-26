import { useState, useEffect } from "react";
import EditorPanel from "./components/EditorPanel";
import PreviewPanel from "./components/PreviewPanel";
import "./App.css";

function App() {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1 { color: #00ffd5; text-align:center; }");
  const [js, setJs] = useState("console.log('Hello World');");

  const [activeTab, setActiveTab] = useState("html");
  const [showPreview, setShowPreview] = useState(true);

  // URL SHARE
  useEffect(() => {
    const data = btoa(JSON.stringify({ html, css, js }));
    window.history.replaceState(null, null, `?code=${data}`);
  }, [html, css, js]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      try {
        const parsed = JSON.parse(atob(code));
        setHtml(parsed.html || "");
        setCss(parsed.css || "");
        setJs(parsed.js || "");
      } catch {}
    }
  }, []);

  const loadTemplate = () => {
    setHtml("<h1>🔥 Modern Editor</h1><p>Edit me!</p>");
    setCss("body{font-family:sans-serif;background:#111;color:white;text-align:center}");
    setJs("console.log('Template Loaded');");
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <div className="navbar">
        <h2>⚡ Code Editor</h2>
        <div className="actions">
          <button onClick={loadTemplate}>Template</button>
          <button onClick={() => setShowPreview(!showPreview)}>Preview</button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button onClick={() => setActiveTab("html")} className={activeTab==="html"?"active":""}>HTML</button>
        <button onClick={() => setActiveTab("css")} className={activeTab==="css"?"active":""}>CSS</button>
        <button onClick={() => setActiveTab("js")} className={activeTab==="js"?"active":""}>JS</button>
      </div>

      <div className="main">
        {/* EDITOR */}
        <div className="editorSection">
          {activeTab === "html" && <EditorPanel language="html" value={html} onChange={setHtml} />}
          {activeTab === "css" && <EditorPanel language="css" value={css} onChange={setCss} />}
          {activeTab === "js" && <EditorPanel language="javascript" value={js} onChange={setJs} />}
        </div>

        {/* PREVIEW */}
        {showPreview && (
          <div className="previewSection">
            <PreviewPanel html={html} css={css} js={js} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;