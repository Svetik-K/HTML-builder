const fs = require('fs/promises');
const path = require('path');

getFilesInfo();

async function getFilesInfo() {
  const files = await fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
  for(let file of files) {
    const pathToFile = path.resolve(__dirname, 'secret-folder', file.name);
    if(file.isFile()) {
      const stats = await fs.stat(pathToFile, error => {
        if(error) {
          console.log(`There occurred an error: ${error.message}`);
        }   
      });
      const fileName = file.name.split('.')[0];
      const fileSize = stats.size;
      console.log(`${fileName} - ${path.extname(file.name)} - ${(fileSize / 1024).toFixed(3)}kb`);   
    }
  };
}