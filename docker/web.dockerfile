FROM nginx:stable

# Set one or more individual labels
LABEL com.warmuprx.version="0.0.1-beta"
LABEL vendor="Warm Up Rx"
LABEL com.warmuprx.release-date="2017-01-17"
LABEL com.warmuprx.version.is-production=""

RUN mkdir -p /etc/nginx/logs
RUN touch /etc/nginx/logs/error.log

ADD docker/config/nginx/nginx.conf /etc/nginx/nginx.conf

ADD app /var/www/virtual/warmuprx/

EXPOSE 4000
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
