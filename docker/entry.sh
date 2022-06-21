#!/bin/sh

FLAG_FILE="/configured"
NGINX_CONFIG_FILE="/etc/nginx/conf.d/default.conf"
MAIN_FILE="/www/main-es*"

if [ ! -f "$FLAG_FILE" ]; then
    sed -i "s/≠domain/$DOMAIN/" $NGINX_CONFIG_FILE
    if [ "$IGNORE_CERTBOT" = false ]; then
        certbot --nginx --redirect --hsts --uir -n --agree-tos --email "$EMAIL" -d "$DOMAIN"
    else
        echo "Ignoring certbot configuration"
    fi
    echo "configured" > $FLAG_FILE
fi

nginx -g "daemon off;"
