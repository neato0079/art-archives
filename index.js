// Some of the following code follows this article https://developer.twitter.com/en/docs/tutorials/explore-a-users-tweets

// Use this reference to configure url endpoints for fetching user data https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users

// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets

const axios = require('axios').default;
require('dotenv').config();

const myTwitterProfile = 'Mattbot8';

const getUserID = async (userName) => {
    // console.log(`USER NAME: ${userName}`);
    return axios({
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${userName}`,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            const userID = response.data.data.id;
            // console.log(response)
            // console.log(userID)
            return userID;
        })
        .catch(e => { throw e });
};

const buildMediaLibrary = async (userID, untilID) => {
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
            // console.log(`inside then block`)
            // const oldestTweetResult = response.data.meta.oldest_id
            // console.log(oldestTweetResult);
            const mediaLibrary = []
            if (!response.data.includes){ // this is where media urls are found in the response json
                console.log('No more user media found')
                // console.log(mediaLibrary)
                return {
                    additionalMedia: mediaLibrary,
                    updatedOldestTweet: response.data.meta.oldest_id
                }
            }
            const userMedia = response.data.includes.media
            for (media of userMedia) {
                // console.log(`User media:\n${userMedia[0]}`)
                // console.log(response.data.data[0])
                const mediaURL = media.url
                if (mediaURL) {
                    mediaLibrary.push(mediaURL);
                }
            }
            console.log(`Found ${userMedia.length} more media url(s)`)
            // console.log(mediaLibrary)
            return {
                additionalMedia: mediaLibrary,
                updatedOldestTweet: response.data.meta.oldest_id
            }

            // call endpoint again but with until_id param
            // if until_id param is null then return mediaLibrary
            // else add to media library
            // console.log(JSON.stringify(tweetObject))
            console.log(mediaLibrary)
            console.log(`Found ${mediaLibrary.length} media url(s)`)
        })
        .catch(e => {
            console.log(`buildMediaLibrary problem? Here's the error!: ${e}`)
            throw e 
            });
};



const getUserMedia2 = async () => {
    const userID = await getUserID(myTwitterProfile);

    const firstCall =`https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets,replies&max_results=100&expansions=attachments.media_keys&media.fields=url`

    axios({
        method: 'get',
        url: firstCall,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(async response => {
            const oldestTweetResult = response.data.meta.oldest_id
            // console.log(oldestTweetResult);
            // console.log(userID)
            let mediaLibrary = []
            const userMedia = response.data.includes.media
            for (media of userMedia) {
                // console.log(`User media:\n${userMedia[0]}`)
                // console.log(response.data.data[0])
                const mediaURL = media.url
                if (mediaURL) {
                    mediaLibrary.push(mediaURL);
                }
            }

            console.log(`Found ${mediaLibrary.length} media url(s) on first pass`)

            let {additionalMedia, updatedOldestTweet} = await buildMediaLibrary(userID, oldestTweetResult);
            mediaLibrary.push(...additionalMedia)
            // console.log(conintueGetMedia)
            while (updatedOldestTweet){
                // console.log(`Current oldest tweet: ${updatedOldestTweet}`)
                const result = await buildMediaLibrary(userID, updatedOldestTweet);
                mediaLibrary.push(...result.additionalMedia) 
                updatedOldestTweet =result.updatedOldestTweet
                // console.log(`Current oldest tweet: ${updatedOldestTweet}`)
                console.log(`Current total: ${mediaLibrary.length} media url(s)`)
                // console.log(updatedOldestTweet)

            }

            console.log(mediaLibrary)
            console.log(`Found ${mediaLibrary.length} media url(s)`)
            return mediaLibrary
        })
        .catch(e => {
            console.log(`Twitter API problem? Here's the error!: ${e}`)
            throw e 
            });
};

// getUserID(myTwitterProfile)
getUserMedia2();
// getTwitterTimeline();
// PLAN: get media library from a given user. Get the media IDs for all image media in that library. Convert media ID to url? Download image urls to disk

// Maybe something like
/* 
while continuing_token == True
    starting_id = ending_id
*/