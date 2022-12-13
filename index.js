const axios = require('axios').default;
require('dotenv').config();
const fs = require('fs');
const downloadDirectory = './archives';
const helper = require('./helper');

const cliArgument = process.argv[2];

const main = async (twitterProfile) => {
    // create download directory if it hasn't been created already
    if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory);
    }

    const mediaURLs = await helper.getAllUserMedia(twitterProfile);
    console.log(mediaURLs);

    helper.dlAxiosArray(twitterProfile, mediaURLs);
}

main(cliArgument);
