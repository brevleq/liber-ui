FROM nginx:stable-alpine
RUN apk add --no-cache certbot
RUN apk add --no-cache certbot-nginx

COPY entry.sh /
COPY renew.sh /
COPY default.conf /etc/nginx/conf.d/
COPY www /www

RUN chmod 755 /entry.sh
RUN chmod 755 /renew.sh

CMD ["/entry.sh"]
