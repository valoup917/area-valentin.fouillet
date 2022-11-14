FROM node:18-alpine

WORKDIR /storage

COPY . ./

RUN npm install

EXPOSE 9145

CMD ["node", "index.js"]
