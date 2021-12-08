FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json ./

COPY . ./

RUN npm install

CMD ["npm", "start"]
