const fs = require('fs');
const path = require('path');

function replaceNavbarSize(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Currently sizes are: w-36 h-10 and w-32 h-8
    // We update them to w-48 h-12 for a much larger logo display. Same as footer basically. Or w-56 h-14 depending.
    let updated = false;

    if (content.includes('w-36 h-10')) {
        content = content.replace(/w-36 h-10/g, 'w-56 h-14');
        updated = true;
    }

    if (content.includes('w-32 h-8')) {
        content = content.replace(/w-32 h-8/g, 'w-48 h-12');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated size in: ' + filePath);
    }
}

const targetFiles = [
    'src/app/page.tsx',
    'src/app/tentang/page.tsx',
    'src/app/syarat-dan-ketentuan/page.tsx',
    'src/app/kebijakan-privasi/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/blog/[slug]/page.tsx',
];

targetFiles.forEach(f => {
    let filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        replaceNavbarSize(filePath);
    }
});
