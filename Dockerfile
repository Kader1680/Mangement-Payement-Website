FROM node:18

WORKDIR /management

COPY package*.json ./

RUN npm start

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD [ "node server.js" ]