FROM node:5.9.0

# Set one or more individual labels
LABEL com.warmuprx.version="0.0.1-beta"
LABEL vendor="Warm Up Rx"
LABEL com.warmuprx.release-date="2017-01-17"
LABEL com.warmuprx.version.is-production=""

ENV APP_ROOT_PATH ""
ENV NODE_ENV staging

ADD server /server
ADD shared /shared
ADD package.json /
ADD database.json /

RUN node -v

RUN npm install

EXPOSE 3000
CMD [ "node", "./server/server.js" ]
