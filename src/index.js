const path = require('path');
const fs = require('fs').promises;


async function concatSass(inputDir) {
  let result = '';

  const scssFiles = await fs.readdir(inputDir);
  for( const file of scssFiles ) {
    if(path.extname(file) === '.scss') {
      const filePath = path.join(inputDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      result += content + '\n';
    }
  }

  return result;
}

const inputDir = './src/styles';
const outuptDir = '../dist/index.scss';
async function boot() {
  let content = '';

  content = await concatSass(inputDir);

  await fs.writeFile(path.join(__dirname, outuptDir), content, 'utf8');
}

boot();