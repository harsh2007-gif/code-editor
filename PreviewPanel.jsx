const PreviewPanel = ({ html, css, js }) => {
  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (e) {
            console.error(e);
          }
        <\/script>
      </body>
    </html>
  `;

  return (
    <iframe
      className="previewFrame"
      srcDoc={srcDoc}
      title="preview"
      sandbox="allow-scripts"
    />
  );
};

export default PreviewPanel;