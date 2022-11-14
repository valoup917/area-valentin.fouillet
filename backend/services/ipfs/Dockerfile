FROM node:18-alpine

WORKDIR /ipfs_service

COPY . ./

RUN npm install

EXPOSE 9030

CMD ["npm", "start", "server.js"]