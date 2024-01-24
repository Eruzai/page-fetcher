const request = require('request');
const fs = require('fs');
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
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }
    fs.realpath(localFilePath, (err) => {
      if (err) {
        writeFile(localFilePath, body);
      } else {
        rl.question("❌ The file exists in that location! Type Y followed by pressing the enter key to overwrite. ", (answer) => {
          if (answer.toUpperCase() === "Y") {
            writeFile(localFilePath, body);
            rl.close();
          } else {
            rl.close();
          }
        })
      }
    })
  });
};

fetcher(pageToFetch, saveLocation);