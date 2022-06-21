FROM nginx:stable-alpine
RUN apk add --no-cache certbot
RUN apk add --no-cache certbot-nginx

COPY entry.sh /
COPY default.conf /etc/nginx/conf.d/
COPY www /www

RUN chmod 755 /entry.sh

CMD ["/entry.sh"]
