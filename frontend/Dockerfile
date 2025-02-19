FROM node:latest

WORKDIR /app

COPY ./src .

COPY package*.json ./

EXPOSE 80

RUN npm install
RUN npm i
RUN npm i @mui/icons-material

CMD npm start