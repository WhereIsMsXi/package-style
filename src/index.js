const path = require('path');
const fs = require('fs').promises;


async function resetOutupFolder() {
  const distPath = path.join(__dirname, distDir);
  try {
    await fs.stat(distPath);

    if (stats.isDirectory()) {
      await fs.rm(distPath, { recursive: true });
    }
  } catch (error) {
    console.log('not have dist folder');
  }

  await fs.mkdir(distPath, { recursive: true });
}
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
const distDir = '../dist'; 
async function boot() {
  let content = '';

  await resetOutupFolder();

  content = await concatSass(inputDir);

  await fs.writeFile(path.join(__dirname, outuptDir), content, 'utf8');
}

boot();