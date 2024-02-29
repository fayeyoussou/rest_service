FROM node:21-alpine3.18

EXPOSE 3200

RUN apk add --update tini

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
#CMD ["tini", "--", "node"3000, "./bin/www"]