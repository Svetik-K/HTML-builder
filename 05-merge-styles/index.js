const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

readAllStyles();

async function readAllStyles() {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
  const files = await fsPromises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true}, error => {
    if(error) {
      console.log(`There occurred an arror: ${error.message}`);
    }
  });

  for(let file of files) {
    if(file.isFile() && path.extname(file.name) == '.css') {
      const readStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name));
      let data = '';
      readStream.on('data', chunk => data += chunk);
      readStream.pipe(writeStream);
    }
  }
}