FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i @npm5

COPY ./src .

EXPOSE 5000

CMD ["npm","start"]