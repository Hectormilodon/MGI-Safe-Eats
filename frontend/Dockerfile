FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm i @mui/icons-material

COPY ./src .

EXPOSE 80

CMD npm start