// https://developer.twitter.com/en/docs/twitter-ads-api/creatives/guides/identifying-media

// All image cards include an image response attribute that contains the Twitter image URL. (For image app download cards, the name is wide_app_image.)

// For Tweets, the media URL location depends on both the type of media and the endpoint being used. For Tweets with a single image, the URL can be found in entities["media"][0]["media_url"]. This is true for both the Ads API and the Standard API. When Tweets contain multiple images, however, the URLs can only be found extended_entities["media"][i]["media_url"]. This is only available in the Standard API.

// Fetching media

// As stated above, image cards do not contain references to either media IDs or media keys. As a result, it's not possible to fetch their assets through the Media Library. This is also true for Account Media images.

// Video cards require that the video asset be part of the Media Library (or the Videos resource before it) prior to creating it. As a result, these assets will always be retrievable in the Media Library. This is also true for Account Media PREROLL assets.

// Finally, media in Tweets are always guaranteed to be in the Media Library.

// The following table summarizes which assets are retrievable in the Media Library, taking into account whether the resource response includes an identifier to use in the lookup.

// The following code follows this article https://developer.twitter.com/en/docs/tutorials/explore-a-users-tweets

const axios = require('axios').default
require('dotenv').config();

const myTwitterProfile = 'Mattbot8'

const getUserID = async (userName) => {
    axios({
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${userName}`,
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
    })
        .then(response => {
            const userID = response.data.data.id
            console.log(userID)
            return userID
        })
        .catch(e => {throw e})

}

getUserID(myTwitterProfile)