const fs = require('fs');
const files = [
  '1. DS-ML Intro.jsx',
  '2. Data Preprocessing Combined.jsx',
  '3. ML Combined.jsx',
  '4. Deep Learning Combined.jsx',
  '5. Neural Net Combined.jsx',
  '6. CNN Combined.jsx',
  '7. Deep Learning Combined.jsx',
  '8. Image Combined.jsx',
  '10. RAG Combined.jsx',
];

// Check the root-level container styles for each module
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  
  // Find export default function and its return root div
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (/export default function/.test(lines[i])) {
      for (let j = i; j < Math.min(i + 100, lines.length); j++) {
        if (/return\s*\(/.test(lines[j])) {
          // Print lines j to j+15
          console.log('\n=== ' + f + ' (root return @ line ' + (j+1) + ') ===');
          for (let k = j; k < Math.min(j+15, lines.length); k++) {
            console.log((k+1) + ': ' + lines[k]);
          }
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }
}

// Also find design token colors and body background
console.log('\n\n=== DESIGN TOKENS (bg / text color vars) per module ===');
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8').slice(0, 3000); // first 3000 chars
  // Find bg and text color tokens
  const bgMatch = src.match(/bg\s*:\s*["']([^"']+)["']/g) || [];
  const txMatch = src.match(/tx\s*:\s*["']([^"']+)["']/g) || [];
  const textMatch = src.match(/text\s*:\s*["']([^"']+)["']/g) || [];
  const colorMatch = src.match(/color\s*:\s*["']([^"']+)["']/g) || [];
  if (bgMatch.length || txMatch.length) {
    console.log(f + ': bg=' + bgMatch.slice(0,2) + ' tx=' + txMatch.slice(0,2));
  }
}
