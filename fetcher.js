const request = require('request');
const fs = require('fs');
const constants = require('fs');
const readline = require('readline');

const pageToFetch = process.argv[2]; // accepts command line argument for URL page
const saveLocation = process.argv[3]; // accepts command line argument for save location

const writeFile = function(filePath, data) { // function to write the URL page to a location on the local drive
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log("❌ Invalid filepath"); // if the file path isn't valid prints this message to the console
    } else {
      console.log(`✅ Downloaded and saved ${data.length} bytes to ${filePath}`); // prints the size and location of the downloaded page
    }
  });
};

const fetcher = function(URL, localFilePath) {
  request(URL, (error, response, body) => {
    if (error) {
      console.log("❌ Invalid URL"); // If the URL doesn't work, prints a message to console.
    } else {
      fs.access(localFilePath, constants.F_OK, (err) => {
        if (err) {
          writeFile(localFilePath, body); // if the path doesn't exist (the file doesn't exist) creates and writes to the file
        } else {
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl.question("🛑 The file exists at this location! Hit enter to cancel or enter 'Y' to overwrite. ", (answer) => {
            if (answer.toUpperCase() === 'Y') { // if the file exists a prompt is generated to ask the user for direction
              writeFile(localFilePath, body);
            }
            rl.close();
          });
        }
      });
    }
  });
};

fetcher(pageToFetch, saveLocation);