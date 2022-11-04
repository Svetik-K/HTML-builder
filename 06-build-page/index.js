const {copyFilesFromDirectory} = require('../04-copy-directory/index') ;
const {readAllStyles} = require('../05-merge-styles/index');
const fs = require('fs');
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
  copyFilesFromDirectory(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  readAllStyles(path.join(__dirname, 'project-dist', 'style.css'), path.join(__dirname, 'styles'));
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