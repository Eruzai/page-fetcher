const request = require('request');
const fs = require('fs');

const pageToFetch = process.argv[2];
const saveLocation = process.argv[3];

const fetcher = function (URL, localFilePath) {
  request(URL, (error, response, body) => {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }
    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        console.log("there was an error", err);
      }
    });
  });
  /*download the resource at the URL to the local file path on my machine
  print out a message when done - "downloaded and saved x bytes to <file path>" 
  example input and output below:
  > node fetcher.js http://www.example.edu/ ./index.html
  Downloaded and saved 3261 bytes to ./index.html*/
};

fetcher(pageToFetch, saveLocation);