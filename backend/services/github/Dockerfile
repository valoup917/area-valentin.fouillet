FROM node:18-alpine

WORKDIR /github

COPY . ./

RUN npm install

EXPOSE 9065

CMD ["node", "index.js"]
