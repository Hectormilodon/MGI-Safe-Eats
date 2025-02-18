FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 5000

RUN stagex/npm i

CMD ["npm","start"]