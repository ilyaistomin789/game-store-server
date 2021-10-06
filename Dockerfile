FROM node:14.17.6-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 4000

CMD npm start

