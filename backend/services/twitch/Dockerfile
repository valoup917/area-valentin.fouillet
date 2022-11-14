FROM node:18-alpine

WORKDIR /twitch

COPY . ./

RUN npm install

EXPOSE 9135

CMD ["node", "index.js"]
