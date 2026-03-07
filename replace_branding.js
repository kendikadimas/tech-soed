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
        if (content.includes('TechSoed')) {
            let result = content.replace(/TechSoed/g, 'Soedirman Inovasi Digital');
            fs.writeFileSync(filePath, result, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
}

const targetDir = path.join(__dirname, 'src');
walkDir(targetDir, replaceInFile);
