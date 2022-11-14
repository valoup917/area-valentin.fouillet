FROM node:18-alpine

WORKDIR /discord

COPY . ./

RUN npm install

EXPOSE 9010

CMD ["node", "index.js"]
