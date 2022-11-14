FROM node:18-alpine

WORKDIR /gateway

COPY . ./

RUN npm install -g --force nodemon
RUN npm install

EXPOSE 8080

CMD ["nodemon", "gateway.js"]