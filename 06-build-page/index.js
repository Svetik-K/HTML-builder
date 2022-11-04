const {copyFilesFromDirectory} = require('../04-copy-directory/index') ;
const {readAllStyles} = require('../05-merge-styles/index');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
  if(error) {
    console.log(`There occurred an error: ${error.message}`);
  }
});

copyFilesFromDirectory(path.resolve(__dirname, 'assets'), path.resolve(__dirname, 'project-dist', 'assets'));
readAllStyles(path.resolve(__dirname, 'project-dist', 'style.css'), path.resolve(__dirname, 'styles'));