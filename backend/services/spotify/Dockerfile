FROM node:18-alpine

WORKDIR /spotify

COPY . ./

RUN npm install

EXPOSE 9125

CMD ["node", "index.js"]
