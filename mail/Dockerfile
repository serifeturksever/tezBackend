FROM node:17

WORKDIR /Users/yapikrediteknolojia.s./Desktop/personal-projects/tezBackend/mail

COPY package*.json ./

RUN npm install prettier -g

RUN npm install -g nodemon && npm install

COPY . .

RUN npm run build

EXPOSE 9001:9001

CMD [ "node", "dist/app.js" ]