FROM node:18-alpine

WORKDIR /auth

COPY . ./

RUN npm install

EXPOSE 8090

CMD ["npm", "start", "server.js"]
