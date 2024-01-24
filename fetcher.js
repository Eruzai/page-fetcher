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
        console.log("there was an error: ", err);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`)
    });
  });
};

fetcher(pageToFetch, saveLocation);