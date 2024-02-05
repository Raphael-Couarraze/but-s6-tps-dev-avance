FROM node:lts-bullseye-slim

RUN mkdir -p /home/node/app/module \
	&& chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]