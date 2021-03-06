FROM node:14-alpine

COPY . /app/
RUN apk add --update git
RUN cd /app/ && npm install && npm run build

EXPOSE 8000

CMD cd /app/ && npm start
