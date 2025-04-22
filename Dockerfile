ARG NODE_IMAGE=node:20.17-alpine3.19

FROM $NODE_IMAGE AS base

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apk add --no-cache dumb-init nss freetype ttf-freefont

RUN mkdir -p /app && chown node:node /app
WORKDIR /app
USER node

RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./.husky ./.husky
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

RUN npm install