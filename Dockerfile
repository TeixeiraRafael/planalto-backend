FROM node:latest

WORKDIR /usr/src/backend/

COPY ./app/src .

WORKDIR /usr/src/backend/src

RUN npm install

CMD ["npm", "start"]