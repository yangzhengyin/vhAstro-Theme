const { exec } = require('child_process');
const path = require('path');

// 执行Astro构建
function buildAstro() {
    return new Promise((resolve, reject) => {
        exec('npm run build', {
            cwd: path.resolve(__dirname, '..')
        }, (error, stdout, stderr) => {
            if (error) {
                console.error(`构建错误: ${error}`);
                reject(error);
                return;
            }
            console.log(`构建输出: ${stdout}`);
            resolve();
        });
    });
}

// 如果直接运行此脚本
if (require.main === module) {
    buildAstro().catch(console.error);
}

module.exports = buildAstro; 