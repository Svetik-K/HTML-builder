const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const pathStyles = path.join(__dirname, 'styles');
readAllStyles(pathToBundle, pathStyles);

async function readAllStyles(pathToBundle, pathStyles) {
  const writeStream = fs.createWriteStream(pathToBundle);
  const files = await fsPromises.readdir(pathStyles, {withFileTypes: true}, error => {
    if(error) {
      console.log(`There occurred an arror: ${error.message}`);
    }
  });

  for(let file of files) {
    if(file.isFile() && path.extname(file.name) == '.css') {
      const readStream = fs.createReadStream(path.join(pathStyles, file.name));
      let data = '';
      readStream.on('data', chunk => data += chunk);
      readStream.pipe(writeStream);
    }
  }
  console.log(`The file with all the styles has been successfully created!`);
}