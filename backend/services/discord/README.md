# Discord service

## Table of Contents

- [Discord service](#discord-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the discord service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```npm install``` command to install all the dependencies. Then you have to use ```node index.js``` to run the server.
    There! Now that the server is running on localhost:9010 on local or discord:9010 on docker you can try a simple /Discord/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our Discord service the route is the following : /Discord/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/ping](pictures/pingdiscord.png)
  - ![/message](pictures/messagediscord.png)
  - ![/announcement](pictures/announcementdiscord.png)
  - ![/sendrandommeme](pictures/sendrandommemediscord.png)
  - ![/sendrandomgif](pictures/sendrandomgif.png)
