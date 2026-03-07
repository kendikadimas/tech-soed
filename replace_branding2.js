const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceInFile(filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Replace lower case techsoed
        if (content.includes('techsoed')) {
            content = content.replace(/techsoed/g, 'soedirmaninovasi');
            updated = true;
        }

        // Replace tech-soed inside URLs
        if (content.includes('tech-soed')) {
            content = content.replace(/tech-soed/g, 'soedirman-inovasi');
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
}

const targetDir = path.join(__dirname, 'src');
walkDir(targetDir, replaceInFile);
