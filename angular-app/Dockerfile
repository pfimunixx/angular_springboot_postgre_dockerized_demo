FROM node:14-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:1.21.1-alpine

#RUN mkdir /usr/share/nginx/html/app

COPY --from=builder /app/dist/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]