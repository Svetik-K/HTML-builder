import {copyFilesFromDirectory} from '../04-copy-directory/index';
import {readAllStyles} from '../05-merge-styles/index';

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
  if(error) {
    console.log(`There occurred an error: ${error.message}`);
  }
});