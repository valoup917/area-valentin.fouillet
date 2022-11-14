# Coingecko service

## Table of Contents

- [Coingecko service](#coingecko-service)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [API documentation](#api-documentation)

- [go_to_root](../../../README.md)

## About

This folder is all about the coingecko service, in this readme you will see how to use this service and what to exepect of it.

## API documentation

- How to use it ?
  - Simple, you jut have to run the: ```npm install``` command to install all the dependencies. Then you have to use ```node index.js``` to run the server.
    There! Now that the server is running on localhost:9040 on local or coingecko:9040 on our docker compose you can try a simple /coingecko/ping to check if everything is ok.

- EndPoints

  - First thing first to ping our coingecko service the route is the following : /coingecko/"endpoints" replace "enpoints" by one of the following endoints.

  - ![/ping](pictures/pingroutecoingecko.png)
  - ![/coinprice](pictures/coinpriceroutecoingecko.png)
  - ![/existingcoin](pictures/existingcoincoingecko.png)
  - ![/checkcoinprice](pictures/checkocoinpricecoingecko.png)
  - ![/changeonehour](pictures/changeonehourcoingecko.png)
  - ![/checkchangeonehourpercentage](pictures/checkochangeonehourcoingecko.png)
  - ![/changeoneday](pictures/changeonedaycoingecko.png)
  - ![/checkchangeonedaypercentage](pictures/checkchangeonedaycoingecko.png)
  - ![/changeoneweek](pictures/changeoneweekcoingecko.png)
  - ![/checkchangeoneweekpercentage](pictures/checkchangeoneweekcoingecko.png)
  - BITCOIN routes
  - ![/btccheckcoinprice](pictures/btccheckcoinprice.png)
  - ![/btccheckonehour](pictures/btccheckonehour.png)
  - ![/btccheckoneday](pictures/btccheckoneday.png)
  - ![/btccheckweek](pictures/btccheckoneweek.png)
  - ETHEREUM routes
  - ![/ethcheckcoinprice](pictures/ethcheckcoinprice.png)
  - ![/ethcheckonehout](pictures/ethcheckonehour.png)
  - ![/ethcheckoneday](pictures/ethcheckoneday.png)
  - ![/ethcheckoneweek](pictures/ethcheckoneweek.png)
  - BNB routes
  - ![/bnbcheckcoinprice](pictures/bnbcheckcoinprice.png)
  - ![/bnbcheckchangeonehour](pictures/bnbcheckonehour.png)
  - ![/bnbcheckchangeoneday](pictures/bnbcheckoneday.png)
  - ![/bnbcheckchangeoneweek](pictures/bnbcheckoneweek.png)
  - BINANCE USD routes
  - ![/binanceusdcheckcoinprice](pictures/binanceusdcheckcoinprice.png)
  - ![/binanceusdcheckchangeonehour](pictures/binanceusdcheckonehour.png)
  - ![/binanceusdcheckchangeoneday](pictures/binanceusdcheckoneday.png)
  - ![/binanceusdcheckchangeoneweek](pictures/binanceusdcheckoneweek.png)
  - SOLANA routes
  - ![/solanacheckcoinprice](pictures/solanacheckcoinprice.png)
  - ![/solanacheckchangeonehour](pictures/solanacheckonehour.png)
  - ![/solanacheckchangeoneday](pictures/solanacheckoneday.png)
  - ![/solanacheckchangeoneweek](pictures/solanacheckoneweek.png)
