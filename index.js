const fs = require('fs');

const twitterPic = 'https://assets-global.website-files.com/5a016d51240da900013d2ea2/5fc8e1f4bc8a02aecf06f035_eyeem-23716958-121079333-(1)%20(1).png'
const mediaStream = fs.createReadStream(twitterPic)
const writeStream = fs.createWriteStream('./output');

mediaStream.pipe(writeStream)