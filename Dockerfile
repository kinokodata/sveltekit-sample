FROM node:20-alpine

WORKDIR /app

COPY package*.json .

EXPOSE 3000