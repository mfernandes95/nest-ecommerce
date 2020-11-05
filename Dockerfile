FROM node:14.15.0-alpine3.10

WORKDIR /usr/app

COPY package*.json ./

RUN yarn
RUN npm i -g @nestjs/cli

COPY . .