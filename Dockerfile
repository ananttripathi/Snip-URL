FROM node:18-slim

WORKDIR /app

COPY package.json .
RUN npm install --production

COPY server/ ./server/
COPY client/ ./client/

ENV PORT=7860

EXPOSE 7860

CMD ["node", "server/index.js"]
