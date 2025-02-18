FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 80

RUN npm install -g npm@latest

RUN npm install

RUN npm install @mui/icons-material

CMD npm start