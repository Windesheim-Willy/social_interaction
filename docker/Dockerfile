FROM node:8

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src/app

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3000
