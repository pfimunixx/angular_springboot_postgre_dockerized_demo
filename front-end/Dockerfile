FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@15.2.4
RUN npm install
RUN npm install @angular/material@15.2.8 sha.js@2.4.11

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]