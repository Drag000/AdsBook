FROM node:20-slim

LABEL authors="Drag000"

RUN apt-get update && apt-get install -y \
    dos2unix \
    curl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN chmod +x /app/entrypoint.sh
RUN dos2unix /app/entrypoint.sh

EXPOSE 5173

ENTRYPOINT ["./entrypoint.sh"]
