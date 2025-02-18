FROM node:alpine

WORKDIR /app

COPY ./src .

EXPOSE 80

RUN npm install -g npm@latest
RUN npm i
RUN npm i @mui/icons-material

CMD npm start