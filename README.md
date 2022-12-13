# art-archives
A node.js program for archiving art from twitter in case it dies.

After node.js is installed, and you have set up the program, run the program with either of the following commands:

```node index.js <twitter username>```

or

```npm run art-get <twitter username>```

This program will find all user posted images from a specified twitter user and download them into a respective folder.

# Instructions:

## Install Node.js First!

For Windows: https://www.geeksforgeeks.org/installation-of-node-js-on-windows/

For Linux: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/

For Mac OS: https://www.webucator.com/article/how-to-install-nodejs-on-a-mac/


## Program Setup

You will need to sign up for a Twitter developer account and to have created a Twitter App. Once you have those, you'll also need to obtain the API keys found in the developer portal. Follow the steps below:

1. Login to your Twitter account on developer.twitter.com.
2. Navigate to the Twitter App dashboard and create a new Twitter App for which you would like to generate access tokens.
3. Navigate to the "keys and tokens" page.
4. You'll find the API keys, user Access Tokens, and Bearer Token on this page.
5. You only need the Bearer Token for this program. Copy it and create a `.env` file in the program's root folder.
6. Inside your `.env` file enter the following and save: ```export BEARER_TOKEN=<paste your Bearer token here>```
7. That's it! You can now run the program and start archiving your favorite artists on twitter!