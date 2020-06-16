FROM node:alpine

<<<<<<< HEAD
LABEL https://github.com/Sean-Bradley
=======
LABEL github=https://github.com/Sean-Bradley
>>>>>>> master

COPY src /nodejs/src
COPY package.json /nodejs/package.json
COPY tsconfig.json /nodejs/tsconfig.json

WORKDIR /nodejs

RUN npm install

EXPOSE 3000:3000
