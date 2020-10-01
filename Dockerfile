FROM node:alpine

LABEL https://github.com/Sean-Bradley

COPY package.json /nodejs/package.json
COPY tsconfig.json /nodejs/tsconfig.json
COPY dist /nodejs/dist

WORKDIR /nodejs

RUN npm install

EXPOSE 3020:3000
