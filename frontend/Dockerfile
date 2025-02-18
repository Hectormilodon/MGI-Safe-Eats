FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 80

RUN github/npm install -g npm@latest

RUN github/npm i

RUN npm i @mui/icons-material

CMD npm start