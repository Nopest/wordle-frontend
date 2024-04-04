FROM node:lts-alpine AS builder

ARG VITE_CONFIG_PATH
ENV VITE_CONFIG_PATH=$VITE_CONFIG_PATH

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



FROM nginx:alpine

COPY --from=0 /app/dist/wordle-angular/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/

EXPOSE 80