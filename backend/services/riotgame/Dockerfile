FROM node:18-alpine

WORKDIR /riotgame

COPY . ./

RUN npm install

EXPOSE 9140

CMD ["node", "index.js"]