const { copyFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files-copy');

fs.mkdir(pathTo, { recursive: true }, error => {
  if(error) {
    console.log(`There occurred an error: ${error.message}`);
  }
});
copyFilesFromDirectory(pathFrom, pathTo); 

async function copyFilesFromDirectory(pathFrom, pathTo) {
  const files = await fs.readdir(pathFrom, { withFileTypes: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`); 
    }
  });
  
  for(let file of files) {
    copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name), error => {
      if(error) {
        console.log(`There occurred an error: ${error.message}`); 
      }
    });
  }
  setTimeout(() => {
    console.log(`All the files have been successfully copied to the 'file-copy' directory.`);
  }, 100);
}

module.exports = {copyFilesFromDirectory};