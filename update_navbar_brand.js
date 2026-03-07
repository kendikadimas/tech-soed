const fs = require('fs');
const path = require('path');

function replaceNavbarBrand(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern 1: w-10 h-10 (page.tsx)
    const pattern1 = /<div className="flex items-center gap-3">\s*<div className="w-10 h-10 rounded relative flex items-center justify-center">\s*<Image src="\/projects\/logotrans.png" alt="([^"]+)" fill className="object-contain" \/>\s*<\/div>\s*<span className="text-xl font-extrabold tracking-tight text-slate-900">([^<]+)<\/span>\s*<\/div>/g;

    // Pattern 2: w-8 h-8 (other pages)
    const pattern2 = /<div className="flex items-center gap-3">\s*<div className="w-8 h-8 rounded relative flex items-center justify-center">\s*<Image src="\/projects\/logotrans.png" alt="([^"]+)" fill className="object-contain" \/>\s*<\/div>\s*<span className="text-xl font-extrabold tracking-tight text-slate-900">([^<]+)<\/span>\s*<\/div>/g;

    let updated = false;

    if (pattern1.test(content)) {
        content = content.replace(pattern1, `<div className="flex items-center">
            <div className="w-36 h-10 rounded relative flex items-center justify-start">
              <Image src="/projects/logotrans.png" alt="$1" fill className="object-contain object-left" />
            </div>
          </div>`);
        updated = true;
    }

    if (pattern2.test(content)) {
        content = content.replace(pattern2, `<div className="flex items-center">
                        <div className="w-32 h-8 rounded relative flex items-center justify-start">
                            <Image src="/projects/logotrans.png" alt="$1" fill className="object-contain object-left" />
                        </div>
                    </div>`);
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
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
        replaceNavbarBrand(filePath);
    }
});
