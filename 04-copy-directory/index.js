const { copyFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files-copy');

copyFilesFromDirectory(pathFrom, pathTo); 

async function copyFilesFromDirectory(pathFrom, pathTo) {
  await fs.mkdir(pathTo, { recursive: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
  const existFiles = await fs.readdir(pathTo, { withFileTypes: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
  if(existFiles.length) {
    for(let file of existFiles) {
      fs.unlink(path.resolve(pathTo, file.name), error => {
        if(error) {
          console.log(`There occurred an error: ${error.message}`);
        } 
      });
    }
  }

  const files = await fs.readdir(pathFrom, { withFileTypes: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`); 
    }
  });
  for(let file of files) {
    if(file.isFile()) {
      copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name), error => {
        if(error) {
          console.log(`There occurred an error: ${error.message}`); 
        }
      });
    }
    else if(file.isDirectory()) {
      copyFilesFromDirectory(path.resolve(pathFrom, file.name), path.resolve(pathTo, file.name));
    }  
  }
  setTimeout(() => {
    console.log(`All the files have been successfully copied.`);
  }, 100);
}

module.exports = {copyFilesFromDirectory};