FROM node:18-alpine

WORKDIR /app

COPY ./src .

EXPOSE 5000

RUN github/npm i

CMD ["npm","start"]