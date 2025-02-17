FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 80

RUN npm install -g npm@10.5.1
RUN npm i
RUN npm i @mui/icons-material

CMD npm start