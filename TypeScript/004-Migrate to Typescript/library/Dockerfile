FROM node:19.8-alpine
WORKDIR /app

ARG NODE_ENV=production

COPY ./package*.json ./

RUN npm install

COPY ./distributive distributive/

COPY ./public public/

COPY ./views views/

CMD ["npm", "run", "server"]