FROM mhart/alpine-node:4

RUN mkdir /src

WORKDIR /src

ADD server.js /src

EXPOSE 3003

CMD ["node", "server.js"]
