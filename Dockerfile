FROM node:14.16.1-alpine3.13

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]