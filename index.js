const fs = require('fs');
const axios = require('axios')
const fetch = require('node-fetch')

const downloadImage = async (url, path) => {
    const response = await axios.get(url);
    // console.log(response.data)
    const base = await response.data.toString('base64')
    // console.log(`BASE64: ${test}`)
    // console.log(`Axios get status:${response.status}`)
    // const blob = await response.blob();
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);
    const buffer = Buffer.from(base) 
    console.log(buffer)
    fs.writeFileSync(path, buffer);
}

const downloadLocalImage = async (url, path) => {
    const encodedImage = fs.readFileSync(url)
    // console.log(`Axios get status:${response.status}`)
    // const blob = await response.blob();
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // console.log(encodedImage)
    await fs.writeFileSync(path, encodedImage);
}

const dl = async (path, url) => {
    const response = await fetch(url);
    console.log(typeof response)
    const buffer = await response.buffer();
    fs.writeFile(path, buffer, () => 
      console.log('finished downloading!'));
}

const axiosDL = async (path, url) => {
    const response = await axios.get(url);
    console.log(response.data)
    const buffer = await response.data.buffer();
    fs.writeFile(path, buffer, () => 
      console.log('finished downloading!'));
}

const localImage = '/home/mattq/Pictures/test.png'
const sabePic = 'https://sabe.io/images/saturn.png'
const twitPic = 'https://pbs.twimg.com/media/FiMjwwgVEAAMbif?format=jpg&name=medium'

// downloadImage(sabePic, "./sample-pic.png"); 
// downloadLocalImage(localImage, 'local-test.png')

dl('./test-fetch.png', twitPic)

// axiosDL('./test-fetch', twitPic)