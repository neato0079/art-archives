const fs = require('fs');
const axios = require('axios');

const dlAxiosArray = async (folderName, urlArray) => {
    let imageCount = 1;

    if (!fs.existsSync(`archives/${folderName}`)) {
        fs.mkdirSync(`archives/${folderName}`);
    }
    urlArray.forEach(async url => {
        axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream(`archives/${folderName}/${folderName}image${imageCount}.png`))
                console.log(`finished downloading image ${imageCount}!`);
                imageCount += 1;

            });
    });
};



const localImage = '/home/mattq/Pictures/test.png';
const sabePic = 'https://sabe.io/images/saturn.png';
const twitPic = 'https://pbs.twimg.com/media/FiMjwwgVEAAMbif?format=jpg&name=medium';
const redditPic = 'https://i.redd.it/jd8kg2f04f1a1.jpg';

const imageArray = [sabePic, twitPic, redditPic]

// dlArray(imageArray)

// dlAxios(redditPic)

// dlAxiosArray('poop',imageArray)

// dl('./test-fetch.png', twitPic)


module.exports = {
    dlAxiosArray
  }
