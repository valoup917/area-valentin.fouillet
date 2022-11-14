# TWITCH service

## Table of Contents

- [TWITCH service](#twitch-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)


## About

This folder is all about the twitch service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```npm install``` command to install all the dependencies. Then you have to use ```node server.js``` to run the server.
    There! Now that the server is running on localhost:9135 on local or twitch:9135 on docker you can try a simple /twitch/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our twitch services the route is the following : /twitch/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/userName](pictures/username.png)
  - ![/userDescription](pictures/userdescription.png)
  - ![/userProfileImage](pictures/userprofileimage.png)
  - ![/userEmail](pictures/useremail.png)
  - ![/changeDescription](pictures/changedescription.png)
  - ![/userFollowers](pictures/userfollowers.png)
  - ![/userBlockedUsers](pictures/userblockedusers.png)
  - ![/userPlaylists](pictures/userplaylists.png)
  - ![/userFollowing](pictures/userfollowing.png)
  - ![/userVideos](pictures/uservideos.png)
  - ![/raidUser](pictures/raiduser.png)
