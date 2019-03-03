FROM node:8.5.0

LABEL Sean Bradley <seanwasere@gmail.com>

COPY package.json /nodejs/package.json
COPY tsconfig.json /nodejs/tsconfig.json
COPY dist /nodejs/dist

WORKDIR /nodejs

EXPOSE 3000

RUN npm install

