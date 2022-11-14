# Google service

## Table of Contents

- [Google service](#google-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the google service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```npm install``` command to install all the dependencies. Then you have to use ```node index.js``` to run the server.
    There! Now that the server is running on localhost:9115 on local or google:9115 on docker you can try a simple /google/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our google services the route is the following : /google/service/"endpoints" replace "enpoints" by one of the following endoints.

  - **GMAIL routes, replace ```/google/service/``` by ```/google/gmail```**
  - ![/getUserMessages](pictures/getusermessages.png)
  - ![/getUserDrafts](pictures/getuserdrafts.png)
  - ![/getUserLabels](pictures/getuserlabels.png)
  - ![/getUserLanguage](pictures/getuserlanguage.png)
  - ![/updateUserLanguage](pictures/updateuserlanguage.png)
  - ![/getUserFilters](pictures/getuserfilters.png)
  - ![/getUserSendAs](pictures/getusersendas.png)
  - ![/trashMessage](pictures/trashmessage.png)
  - ![/sendMail](pictures/sendmail.png)
  - **CALENDAR routes, replace ```/google/service/``` by ```/google/calendar```**
  - ![/getUserEvents](pictures/getuserevents.png)
  - ![/createEvent](pictures/createevent.png)
  - ![/deleteEvent](pictures/deleteevent.png)
  - **DRIVE routes, replace ```/google/service/``` by ```/google/drive```**
  - ![/listFiles](pictures/listfiles.png)
  - ![/createFile](pictures/createfile.png)
  - ![/deleteFile](pictures/deletefile.png)
  - ![/listComment](pictures/listcomment.png)
  - ![/createComment](pictures/createcomment.png)
  - ![/deleteComment](pictures/deletecomment.png)
  - **YOUTUBE routes, replace ```/google/service/``` by ```/google/youtube```**
  - ![/listLikedVideos](pictures/listlikedvideos.png)
  - ![/listDislikedVideos](pictures/listdislikedvideos.png)
