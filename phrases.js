const fs = require('fs');

// Function to add a line to the file
function addLine(line) {
  fs.appendFileSync('phrases.txt', `${line}\n`);
}

// Function to get a line from the file based on its position
function getLine(lineNumber) {
  const fileContent = fs.readFileSync('phrases.txt', 'utf-8');
  const lines = fileContent.split('\n');
  if (lineNumber < 1 || lineNumber > lines.length) {
    return 'Error: Line number out of range';
  }
  if (lineNumber === lines.length) {
    return `Line ${lineNumber}: ${lines[lineNumber - 1]}. This is the last line and has nothing.`;
  }
  return lines[lineNumber - 1];
}

function readLines() {
  const file = fs.readFileSync('phrases.txt', 'utf-8');
  const lines = file.split('\n').filter(Boolean);
  return lines;
}

console.log(readLines())
module.exports = { addLine, getLine, readLines };
