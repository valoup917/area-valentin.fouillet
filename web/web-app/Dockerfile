FROM node:18.7.0-alpine

RUN apk update && apk add bash

WORKDIR /webb-app

COPY . ./

ENV PATH /web-app/nodes_modules/.bin:$PATH

RUN npm install

RUN npm install react-scripts@5.0.1 -g --silent

RUN mkdir -p /volumes/

RUN ln -s /volumes/app-release.apk public/app-release.apk

EXPOSE 8081

CMD [ "npm", "start" ]