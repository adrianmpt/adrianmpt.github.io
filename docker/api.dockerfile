FROM node:5.9.0

ARG node_env
ARG app_mode
ARG app_root_path

# Set one or more individual labels
LABEL com.warmuprx.version="0.0.1-beta"
LABEL vendor="Warm Up Rx"
LABEL com.warmuprx.release-date="2017-01-17"
LABEL com.warmuprx.version.is-production=""

ENV NODE_ENV ${node_env}
ENV APP_MODE ${app_mode}
ENV APP_ROOT_PATH ${app_root_path}

ADD migrations /services/migrations
ADD server /services/server
ADD package.json /services
ADD database.json /services

WORKDIR /services/server

RUN mkdir -p /var/log/warmuprx
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000
EXPOSE 5858

CMD [ "node", "/services/server/server.js" ]
