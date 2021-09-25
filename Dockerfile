FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 3003
EXPOSE ${PORT}
CMD npm run dev