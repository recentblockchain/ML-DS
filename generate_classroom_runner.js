const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node generate_runner.js <jsx-file> [output-file]');
    process.exit(1);
}

const jsxFile = args[0];
const outputFile = args[1] || jsxFile.replace('.jsx', '-runner.html');

try {
    const jsxContent = fs.readFileSync(jsxFile, 'utf8');

    // 1. Identify the main component (export default function Name)
    const exportMatch = jsxContent.match(/export\s+default\s+function\s+(\w+)/);
    const mainComponent = exportMatch ? exportMatch[1] : null;

    if (!mainComponent) {
        console.error('Could not find "export default function ComponentName" in ' + jsxFile);
        process.exit(1);
    }

    // 2. Strip imports and change export default to function
    // More robust import stripping: handle multiline and varied spacing
    const strippedContent = jsxContent
        .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '') // Remove all imports
        .replace(/export\s+default\s+function/g, 'function');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${mainComponent} - Runner</title>
    <!-- React and ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel Standalone for JSX transpilation -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,600;1,400&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; background-color: #080c14; color: #d4ddf0; font-family: sans-serif; }
        #root { min-height: 100vh; }
        #error-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9);
            color: #ff4d4d;
            padding: 40px;
            font-family: 'JetBrains Mono', monospace;
            z-index: 9999;
            overflow: auto;
            white-space: pre-wrap;
        }
        #error-overlay h1 { color: #fff; margin-top: 0; }
        #loading {
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            color: #00d4ff;
            text-shadow: 0 0 10px rgba(0,212,255,0.5);
        }
    </style>
</head>
<body>
    <div id="loading">INITIALIZING ENGINE...</div>
    <div id="root"></div>
    <div id="error-overlay">
        <h1>[CRITICAL ENGINE FAILURE]</h1>
        <div id="error-message"></div>
    </div>

    <script>
        window.onerror = function(msg, url, line, col, error) {
            const overlay = document.getElementById('error-overlay');
            const message = document.getElementById('error-message');
            document.getElementById('loading').style.display = 'none';
            overlay.style.display = 'block';
            message.textContent = \`Error: \${msg}\\nLine: \${line}\\nColumn: \${col}\\n\\nStack Trace:\\n\${error ? error.stack : 'N/A'}\`;
        };
    </script>

    <script type="text/babel" data-presets="env,react">
        const { useState, useEffect, useRef, useCallback, useMemo } = React;

        /* --- START OF EMBEDDED JSX --- */
        ${strippedContent}
        /* --- END OF EMBEDDED JSX --- */

        try {
            const container = document.getElementById("root");
            const root = ReactDOM.createRoot(container);
            root.render(<${mainComponent} />);
            document.getElementById('loading').style.display = 'none';
        } catch (err) {
            console.error(err);
            window.onerror(err.message, null, null, null, err);
        }
    </script>
</body>
</html>`;

    fs.writeFileSync(outputFile, htmlContent);
    console.log('Successfully generated ' + outputFile + ' for ' + mainComponent);
} catch (err) {
    console.error('Error generating runner:', err);
    process.exit(1);
}
