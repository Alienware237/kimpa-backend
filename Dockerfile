FROM node:17.6-alpine3.14 AS development

RUN mkdir -p /usr/src/app/shop_server

COPY package*.json /usr/src/app/shop_server

WORKDIR /usr/src/app/shop_server

RUN npm install glob rimraf

RUN npm install -g @nestjs/cli

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:17.6-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/shop-server

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/shop_server/dist ./dist

CMD ["node", "dist/main"]