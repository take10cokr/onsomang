const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'detail.html');
const content = fs.readFileSync(targetFile, 'utf-8');

const startTag = '<!-- Member Detail Grid (Initially showing Family Lists) -->';
const endTag = '<!-- Footer Summary -->';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
    console.error("Tags not found!");
    process.exit(1);
}

let newContent = content.substring(0, startIndex + startTag.length) +
    '\n                    <div id="familyListContainer" class="grid grid-cols-1 gap-4">\n                        <div class="p-8 text-center text-slate-500">멤버 정보를 불러오는 중입니다...</div>\n                    </div>\n                    ' +
    content.substring(endIndex);

const scriptTag = '<script type="module" src="/src/detail.js"></script>';
if (!newContent.includes(scriptTag)) {
    const bodyEndIndex = newContent.indexOf('</body>');
    newContent = newContent.substring(0, bodyEndIndex) +
        `    ${scriptTag}\n` +
        newContent.substring(bodyEndIndex);
}

fs.writeFileSync(targetFile, newContent, 'utf-8');
console.log("detail.html modified successfully.");
