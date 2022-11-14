# TWITTER service

## Table of Contents

- [TWITTER service](#twitter-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the twitter service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```pip3 install``` command to install all the dependencies. Then you have to use ```py twitter_api.py``` to run the server.
    There! Now that the server is running on localhost:9005 on local or twitter:9005 on docker you can try a simple /twitter/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our twitter services the route is the following : /twitter/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/name](pictures/name.png)
  - ![/username](pictures/username.png)
  - ![/bookmarks](pictures/bookmarks.png)
  - ![/messages](pictures/messages.png)
  - ![/userTweets](pictures/usertweets.png)
  - ![/following](pictures/following.png)
  - ![/followers](pictures/followers.png)
  - ![/likingUsers](pictures/likingusers.png)
  - ![/likedTweets](pictures/likedtweets.png)
  - ![/createTweet](pictures/createtweet.png)
