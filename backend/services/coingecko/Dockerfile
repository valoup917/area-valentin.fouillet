FROM node:18-alpine

WORKDIR /coingecko

COPY . ./

RUN npm install

EXPOSE 9040

CMD ["node", "index.js"]
