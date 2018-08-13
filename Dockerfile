FROM node:8.11.3

RUN useradd --user-group --create-home --shell /bin/false app &&\
 npm install --global npm@5.6.0

ENV DIR=/home/

COPY package.json package-lock.json $DIR/app/
RUN chown -R app:app $DIR/*

USER app
WORKDIR $DIR/app
RUN npm install --no-cache --silent --progress=false

USER root

COPY . $DIR/app

RUN chown -R app:app $DIR/*

USER app

CMD ["npm", "start"]
