const request = require('request');
const fs = require('fs');
const constants = require('fs');
const readline = require('readline');

const pageToFetch = process.argv[2];
const saveLocation = process.argv[3];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeFile = function (filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log("there was an error: ", err);
    }
    console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`)
  });
};

const fetcher = function (URL, localFilePath) {
  request(URL, (error, response, body) => {
    if (error) {
      console.log("Invalid URL", response); // If the URL doesn't work, prints a message to console.
    } else {
      fs.access(localFilePath, constants.F_OK, (err) => {
        if (err) {
          writeFile(localFilePath, body);
        } else {
          rl.question("🛑 The file exists at this location! Hit enter to cancel or enter 'Y' to overwrite. ", (answer) => {
            if (answer.toUpperCase() === 'Y') {
              writeFile(localFilePath, body);
            }
          });
        }
      });
    }
  });
};

fetcher(pageToFetch, saveLocation);