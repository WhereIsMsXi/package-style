const path = require('path');
const fs = require('fs').promises;
async function concatScss(inputDir) {
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

exports.concatScss = concatScss