import Editor from "@monaco-editor/react";

const EditorPanel = ({ language, value, onChange }) => {
  return (
    <div className="editorBox">
      <div className="editorTitle">{language.toUpperCase()}</div>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(value) => onChange(value)}
        theme="vs-dark"
      />
    </div>
  );
};

export default EditorPanel;