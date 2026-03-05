
import os
import re

jsx_file = r'c:\Users\mps6990\Downloads\image-to-video-lecture.jsx'
output_html = r'c:\Users\mps6990\Downloads\image-to-video-lecture-runner.html'

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace imports
content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+"react";?', r'const {\1} = React;', content)

# Remove export default
content = content.replace('export default function ImageToVideoLecture', 'function ImageToVideoLecture')

# Append render code
render_code = """
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ImageToVideoLecture />);
"""

html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image to Video Lecture</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
    <style>
        body {{ margin: 0; font-family: 'DM Sans', sans-serif; background-color: #0a0a1a; color: #dfe6e9; }}
        * {{ box-sizing: border-box; }}
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
{content}
{render_code}
    </script>
</body>
</html>
"""

with open(output_html, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"Created {output_html}")
