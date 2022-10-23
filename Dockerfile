FROM node:alpine
WORKDIR /usr/share/node/app
COPY . /usr/share/node/app
RUN npm install
CMD [ "node", "index.js" ]