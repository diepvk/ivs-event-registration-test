FROM node:14.19.1-alpine3.14 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:14.19.1-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . .

COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/node_modules/ ./node_modules/
COPY --from=development /usr/src/app/dist ./dist

CMD npm run start:prod
