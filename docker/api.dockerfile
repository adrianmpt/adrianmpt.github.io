FROM node:5.9.0

ARG app_root_path
ARG app_mode
ARG node_env

# Set one or more individual labels
LABEL com.warmuprx.version="0.0.1-beta"
LABEL vendor="Warm Up Rx"
LABEL com.warmuprx.release-date="2017-01-17"
LABEL com.warmuprx.version.is-production=""

ENV APP_ROOT_PATH ${app_root_path}
ENV APP_MODE ${app_mode}
ENV NODE_ENV ${node_env}

ADD migrations ${app_root_path}/migrations
ADD server ${app_root_path}/server
ADD package.json ${app_root_path}
ADD database.json ${app_root_path}

WORKDIR ${app_root_path}/server

RUN mkdir -p /var/log/warmuprx
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000
EXPOSE 5858

CMD [ "node", "/services/server/server.js" ]
