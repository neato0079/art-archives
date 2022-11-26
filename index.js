const fs = require('fs');
const fetch = require('node-fetch');


const dl = async (path, url) => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(path, buffer, () =>
        console.log('finished downloading!'));
}

const dlArray = async (urlArray) => {
    let imageCount = 1;

    urlArray.forEach(async url => {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`image${imageCount}.png`, buffer, () => {
            console.log(`finished downloading image ${imageCount}!`);
            imageCount += 1;
        })
    })
}


const localImage = '/home/mattq/Pictures/test.png';
const sabePic = 'https://sabe.io/images/saturn.png';
const twitPic = 'https://pbs.twimg.com/media/FiMjwwgVEAAMbif?format=jpg&name=medium';
const redditPic = 'https://i.redd.it/jd8kg2f04f1a1.jpg';

const imageArray = [sabePic, twitPic, redditPic]

dlArray(imageArray)

// dl('./test-fetch.png', twitPic)


