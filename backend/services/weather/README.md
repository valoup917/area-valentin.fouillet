# Weather service

## Table of Contents

- [Weather service](#weather-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the weather service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```go get``` command to install all the dependencies. Then you have to use ```go run main.go``` to run the server.
    There! Now that the server is running on localhost:8095 you can try a simple /Weather/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our Weather service the route is the following : /Weather/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/toHot](pictures/tohotweather.png)
  - ![/toCold](pictures/tocoldweather.png)
  - ![/tempusercheckmore](pictures/tempusercheckmoreweather.png)
  - ![/tempusercheckless](pictures/tempuserchecklessweather.png)
  - ![/toWet](pictures/tewetweather.png)
  - ![/toDry](pictures/todryweather.png)
  - ![/humusercheckmore](pictures/humusercheckmoreweather.png)
  - ![/humusercheckless](pictures/humuserchecklessweather.png)
  - ![/below10](pictures/below10.png)
  - ![/below0](pictures/below0.png)
  - ![/above20](pictures/above20.png)
  - ![/above30](pictures/above30.png)
  - ![/verycloudy](pictures/verycloudy.png)
  - ![/snowing](pictures/snowing.png)
  - ![/raining](pictures/raining.png)
  - ![/windy](pictures/windy.png)
