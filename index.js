const fs = require('fs');
const axios = require('axios')

const downloadImage = async (url, path) => {
    const response = await axios.get(url);
    console.log(`Axios get status:${response.status}`)
    // const blob = await response.blob();
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);
    const buffer = Buffer.from(response.data) 
    console.log(buffer)
    await fs.writeFileSync(path, buffer);
}

const downloadLocalImage = async (url, path) => {
    const encodedImage = fs.readFileSync(url)
    // console.log(`Axios get status:${response.status}`)
    // const blob = await response.blob();
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    console.log(encodedImage)
    await fs.writeFileSync(path, encodedImage);
}

const localImage = '/home/mattq/Pictures/test.png'
const sabePic = 'https://sabe.io/images/saturn.png'
const twitPic = 'https://pbs.twimg.com/media/FiMjwwgVEAAMbif?format=jpg&name=medium'

downloadImage(sabePic, "./sample-pic.png"); 
downloadLocalImage(localImage, 'local-test.png')
