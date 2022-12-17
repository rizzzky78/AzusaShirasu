FROM node:latest

WORKDIR ./app

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install && npm install pm2 -g

COPY ./ ./

EXPOSE 5000

ENV PM2_PUBLIC_KEY r8r13h1sg89nrm5
ENV PM2_SECRET_KEY vvcfc5uo4rmgbli

CMD ["pm2-runtime", "zeeone.js"]
