FROM node:17

WORKDIR /Users/yapikrediteknolojia.s./Desktop/personal-projects/tezBackend/mobile

COPY package*.json ./

RUN npm install prettier -g

RUN npm install -g nodemon && npm install

COPY . .

RUN npm run build

EXPOSE 1337:1337

CMD [ "node", "dist/app.js" ]