FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm init -y

RUN npm install --global json-server

EXPOSE 3001

CMD ["json-server", "--watch", "server.json", "--port", "3001", "--host", "0.0.0.0"]