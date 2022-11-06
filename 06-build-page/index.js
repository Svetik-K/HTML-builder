const fs = require('fs');
const { copyFile } = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, error => {
  if(error) {
    console.log(`There occurred an error: ${error.message}`);
  }
});

fs.readFile(path.join(__dirname, 'template.html'), (error, templateData) => {
  if(error) {
    console.log(`There occurred an error: ${error.message}`);
  }
  
  let template = templateData.toString();
  useTemplates(template);
  readAllStyles(path.join(__dirname, 'project-dist', 'style.css'), path.join(__dirname, 'styles'));
  copyFilesFromDirectory(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
});

async function useTemplates(template) {
  const componentFiles = await fsPromises.readdir(path.join(__dirname, 'components'), (error) => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
   
  for(let file of componentFiles) {
    fs.readFile(path.join(__dirname, 'components', file), (error, data) => {
      if(error) {
        console.log(`There occurred an error: ${error.message}`);
      }
      let fileName = file.split('.')[0];
      let fileData = data.toString();

      if(template.includes(fileName)) {
        template = template.replace(`{{${fileName}}}`, `${fileData}`);
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, error => {
          if(error) {
            console.log(`There occurred an error: ${error.message}`);
          }
        });
      }  
    });
  }
}

async function copyFilesFromDirectory(pathFrom, pathTo) {
  await fsPromises.mkdir(pathTo, { recursive: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
  const existFiles = await fsPromises.readdir(pathTo, { withFileTypes: true }, error => {
    if(error) {
      console.log(`There occurred an error: ${error.message}`);
    }
  });
  if(existFiles.length) {
    for(let file of existFiles) {
      fs.unlink(path.join(pathTo, file.name), error => {
        if(error) {
          console.log(`There occurred an error: ${error.message}`);
        } 
      });
    }
  }

  const files = await fsPromises.readdir(pathFrom, { withFileTypes: true }, error => {
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
    if(file.isDirectory()) {
      copyFilesFromDirectory(path.join(pathFrom, file.name), path.join(pathTo, file.name));
    }  
  }
  console.log(`All the files have been successfully copied.`);
}

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