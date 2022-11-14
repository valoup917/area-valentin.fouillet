# Github service

## Table of Contents

- [Github service](#github-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the github service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```npm install``` command to install all the dependencies. Then you have to use ```node index.js``` to run the server.
    There! Now that the server is running on localhost:9065 on local or github:9065 on docker you can try a simple /github/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our Github service the route is the following : /github/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/userName](pictures/username.png)
  - ![/userDescription](pictures/userdescription.png)
  - ![/updateUserName](pictures/updateusername.png)
  - ![/updateUserEmail](pictures/updateuseremail.png)
  - ![/updateUserDescription](pictures/updateuserdescription.png)
  - ![/updateEmailVisibility](pictures/updateemailvisibility.png)
  - ![/userFollowers](pictures/userfollowers.png)
  - ![/userFollowing](pictures/userfollowing.png)
  - ![/userRepository](pictures/userrepository.png)
  - ![/createRepository](pictures/createrepository.png)
  - ![/userCommits](pictures/usercommits.png)
  - ![/userBranches](pictures/userbranches.png)
