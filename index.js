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

const getTwitterTimeline = async () => {
    const userID = await getUserID(myTwitterProfile);
    console.log(userID);
    axios({
        method: 'get',
        url: `https://api.twitter.com/2/users/${userID}/tweets`,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => { throw e });
};

const getUserMedia = async () => {
    const userID = await getUserID(myTwitterProfile);
    // console.log(userID);
    axios({
        method: 'get',
        url: `https://api.twitter.com/2/users/${userID}/tweets`,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            // console.log(response);
            const tweetObject = response.data.data
            // console.log(JSON.stringify(tweetObject))
            console.log(tweetObject)
        })
        .catch(e => { throw e });
};

const getUserMedia2 = async () => {
    const userID = await getUserID(myTwitterProfile);
    const userTimelineEndpoint = `https://api.twitter.com/2/users/${userID}/tweets?max_results=5&expansions=attachments.media_keys&media.fields=url`

    const noRepliesOrRetweets = `https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets,replies&max_results=100&expansions=attachments.media_keys&media.fields=url`

    const sampleEndpoint = 'https://api.twitter.com/2/users/2244994945/tweets?tweet.fields=created_at&max_results=100&start_time=2019-01-01T17:00:00Z&end_time=2020-12-12T01:00:00Z'
    // console.log(userID);
    axios({
        method: 'get',
        url: noRepliesOrRetweets,
        // url: `https://api.twitter.com/2/users/${userID}/tweets?max_results=100`,
        // url: 'https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev',
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            console.log(response);
            const mediaLibrary = []
            const userMedia = response.data.includes.media
            for (media of userMedia) {
                // console.log(`User media:\n${userMedia[0]}`)
                // console.log(response.data.data[0])
                const mediaURL = media.url
                if (mediaURL) {
                    mediaLibrary.push(mediaURL);
                }
            }
            // console.log(JSON.stringify(tweetObject))
            console.log(mediaLibrary)
            console.log(`Found ${mediaLibrary.length} media url(s)`)
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