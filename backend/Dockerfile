FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./src .

EXPOSE 5000

CMD ["npm","start"]