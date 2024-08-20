const path = require('path');
const fs = require('fs').promises;
const CleanCSS = require('clean-css');
const { concatScss } = require('./utils')

async function resetOutupFolder() {
  const distPath = path.join(__dirname, distDir);
  try {
    const stats = await fs.stat(distPath);

    if (stats.isDirectory()) {
      await fs.rm(distPath, { recursive: true });
    }
  } catch (error) {
    console.log('not have dist folder');
  }

  await fs.mkdir(distPath, { recursive: true });
}
async function dealScss() {
  const inputDir = './src/styles';
  const outuptFile = '../dist/index.scss';
  
  let content = '';
  content = await concatScss(inputDir);
  content = new CleanCSS().minify(content);
  
  await fs.writeFile(path.join(__dirname, outuptFile), content.styles, 'utf8');
}
async function dealMixin() {
  const inputDir = './src/mixin';
  const outuptFile = '../dist/mixin.scss';
  
  let content = '';
  content = await concatScss(inputDir);
  content = new CleanCSS().minify(content);
  
  await fs.writeFile(path.join(__dirname, outuptFile), content.styles, 'utf8');
}


const distDir = '../dist'; 
async function boot() {

  await resetOutupFolder();

  await dealMixin();
  await dealScss();
}

boot();