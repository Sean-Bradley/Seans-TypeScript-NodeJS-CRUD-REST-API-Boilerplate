FROM node:alpine

LABEL Sean Bradley <seanwasere@gmail.com>

COPY package.json /nodejs/package.json
COPY tsconfig.json /nodejs/tsconfig.json
COPY dist /nodejs/dist

WORKDIR /nodejs

RUN npm install

EXPOSE 3000:3000