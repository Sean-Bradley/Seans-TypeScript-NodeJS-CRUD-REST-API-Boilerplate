FROM node:alpine

LABEL Sean Bradley <seanwasere@gmail.com>

COPY package.json /nodejs/package.json
COPY tsconfig.json /nodejs/tsconfig.json

WORKDIR /nodejs
RUN npm install
COPY nodejs/dist /dist

RUN ls


EXPOSE 3000:3000