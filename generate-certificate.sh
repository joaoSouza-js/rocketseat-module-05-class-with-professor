#!/bin/bash
set -e

ENV_FILE=".env"

openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.key -out public.key

JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A)
JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A)
sed -i '/JWT_PRIVATE_KEY/d' "$ENV_FILE"
sed -i '/JWT_PUBLIC_KEY/d' "$ENV_FILE"
echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> "$ENV_FILE"
echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> "$ENV_FILE"

rm private.key public.key

echo "Chaves geradas e adicionadas em $ENV_FILE com sucesso!"