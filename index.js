const axios = require('axios').default;
require('dotenv').config();
const fs = require('fs');
const downloadDirectory = './archives';
const helper = require('./helper')

const cliArgument = process.argv[2];

const getUserID = async (userName) => {

    return axios({
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${userName}`,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            const userID = response.data.data.id;
            return userID;
        })
        .catch(e => { throw e });
};

const continueBuildingMediaLibrary = async (userID, untilID) => {
    console.log('Checking for more user media...')

    const noRepliesOrRetweetsTwitterTimeline = `https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets,replies&max_results=100&expansions=attachments.media_keys&media.fields=url&until_id=${untilID}`

    return axios({
        method: 'get',
        url: noRepliesOrRetweetsTwitterTimeline,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            const mediaLibrary = []
            if (!response.data.includes) { // this is where media urls are found in the response json
                console.log('No more user media found')

                return {
                    additionalMedia: mediaLibrary,
                    updatedOldestTweet: response.data.meta.oldest_id
                }
            }
            const userMedia = response.data.includes.media
            for (media of userMedia) {
                const mediaURL = media.url
                if (mediaURL) {
                    mediaLibrary.push(mediaURL);
                }
            }
            console.log(`Found ${userMedia.length} more media url(s)`)
            return {
                additionalMedia: mediaLibrary,
                updatedOldestTweet: response.data.meta.oldest_id
            }
        })
        .catch(e => {
            console.log(`buildMediaLibrary problem? Here's the error!: ${e}`)
            throw e
        });
};

const getAllUserMedia = async (twitterProfile) => {
    const userID = await getUserID(twitterProfile);

    const firstCall = `https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets,replies&max_results=100&expansions=attachments.media_keys&media.fields=url`

    return axios({
        method: 'get',
        url: firstCall,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(async response => {
            const oldestTweetResult = response.data.meta.oldest_id
            let mediaLibrary = []
            const userMedia = response.data.includes.media // this may not include all of the the user's media due to twitter API's response cap
            for (media of userMedia) {
                const mediaURL = media.url
                if (mediaURL) {
                    mediaLibrary.push(mediaURL);
                }
            }

            console.log(`Found ${mediaLibrary.length} media url(s) on first pass`)

            // Check if there are additional media and push those to the current media library
            // This is done by checking the oldest tweet in the response and using that as the next starting point
            let { additionalMedia, updatedOldestTweet } = await continueBuildingMediaLibrary(userID, oldestTweetResult);
            mediaLibrary.push(...additionalMedia)
            while (updatedOldestTweet) {
                const result = await continueBuildingMediaLibrary(userID, updatedOldestTweet);
                mediaLibrary.push(...result.additionalMedia)
                updatedOldestTweet = result.updatedOldestTweet
                console.log(`Current total: ${mediaLibrary.length} media url(s)`)

            }

            // console.log(mediaLibrary)
            console.log(`Found ${mediaLibrary.length} media url(s)`)
            return mediaLibrary
        })
        .catch(e => {
            console.log(`Twitter API problem? Here's the error!: ${e}`)
            throw e
        });
};

const main = async (twitterProfile) => {
    // create download directory if it hasn't been created already
    if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory);
    }

    const mediaURLs = await getAllUserMedia(twitterProfile);
    console.log(mediaURLs)

    helper.dlAxiosArray(twitterProfile, mediaURLs)
}
// console.log(mediaURLs)

main(cliArgument)

