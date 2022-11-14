FROM node:18-alpine

WORKDIR /salat

COPY . ./

RUN npm install

EXPOSE 9455

CMD ["node", "index.js"]