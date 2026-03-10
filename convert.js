const fs = require('fs');
const path = require('path');

const files = [
    'screen1_code.html',
    'screen2_code.html',
    'screen3_code.html',
    'screen4_code.html'
];
const outNames = ['Screen1', 'Screen2', 'Screen3', 'Screen4'];

if (!fs.existsSync('frontend/src/pages')) {
    fs.mkdirSync('frontend/src/pages', { recursive: true });
}

files.forEach((file, idx) => {
    let html = fs.readFileSync(file, 'utf8');

    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return;
    let body = bodyMatch[1];

    body = body.replace(/class="/g, 'className="');

    const styleReplacer = (match, styles) => {
        let obj = {};
        styles.split(';').forEach(s => {
            let colonIdx = s.indexOf(':');
            if (colonIdx === -1) return;
            let k = s.substring(0, colonIdx).trim();
            let v = s.substring(colonIdx + 1).trim();
            if (k && v) {
                let key = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
                obj[key] = v;
            }
        });
        return `style={${JSON.stringify(obj)}}`;
    };

    body = body.replace(/style='([^']+)'/g, styleReplacer);
    body = body.replace(/style="([^"]+)"/g, styleReplacer);

    body = body.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    body = body.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    body = body.replace(/<br>/g, '<br />');

    body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    const componentStr = `import React from 'react';\n\nexport default function ${outNames[idx]}() {\n  return (\n    <>\n${body}\n    </>\n  );\n}\n`;

    fs.writeFileSync(`frontend/src/pages/${outNames[idx]}.jsx`, componentStr);
});

console.log('Conversion successful.');
