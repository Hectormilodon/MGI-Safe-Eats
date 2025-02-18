FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 80

RUN stagex/npm install -g npm@latest

RUN stagex/npm i

RUN npm i @mui/icons-material

CMD npm start