#!/bin/sh

# Caminho para o certificado
CERT_PATH="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"

while true; do
  # Captura a saída completa do certbot
  CERT_INFO=$(certbot certificates)

  # Usa grep para encontrar a linha que contém o nome do domínio e a data de expiração
  CERT_LINE=$(echo "$CERT_INFO" | grep -A 4 "Certificate Name: $DOMAIN" | grep "Expiry Date")

  # Extrai a data de expiração da linha capturada e remove "(VALID:" e o que vem depois
  EXP_DATE=$(echo "$CERT_LINE" | cut -d: -f2- | sed 's/+00:00.*//' | xargs -I{} date -d "{}" +%Y-%m-%d)

  # Data atual
  CURRENT_DATE=$(date +%Y-%m-%d)

  # Calcula a diferença em dias entre a data atual e a data de expiração
  DAYS_LEFT=$(( ( $(date -d "$EXP_DATE" +%s) - $(date -d "$CURRENT_DATE" +%s) ) / 86400 ))

  # Renova o certificado se faltarem 15 dias ou menos para expirar
  if [ $DAYS_LEFT -le 15 ]; then
    echo "Renovando o certificado para o domínio $DOMAIN..."
    certbot renew --cert-name $DOMAIN
    nginx -s reload
  else
    echo "O certificado do domínio $DOMAIN ainda é válido por mais $DAYS_LEFT dias."
  fi

  # Dormir por 24 horas (86400 segundos)
  echo "Dormindo por 24 horas..."
  sleep 86400
done
