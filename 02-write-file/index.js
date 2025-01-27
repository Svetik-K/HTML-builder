const fs = require('fs');
const path = require('path');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'notes.txt'));
writeStream.on('error', error => console.log(`There occurred an error: ${error.message}`)); 

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter the text, please: \n'
});

rlInterface.prompt();
rlInterface.on('line', line => {
  if(line.trim() === 'exit') {
    rlInterface.close();
  }else {
    const note = line + '\n';
    writeStream.write(note);
    rlInterface.prompt();
  }
});
rlInterface.on('SIGINT', () => {
  rlInterface.close();
});
rlInterface.on('close', () => {
  writeStream.end();
  process.on('exit', () => console.log(`You kan find all your notes in file 'notes.txt'. See you!`));
  process.exit();
});



