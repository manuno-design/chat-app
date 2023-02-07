FROM node:18.14.0-slim

ENV TZ Asis/Tokyo

RUN apt -y update && apt  -y upgrade && apt -y install \
    bash curl git procps

RUN npm install -g npm vls