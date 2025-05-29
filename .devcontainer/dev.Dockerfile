FROM node:22-alpine

# Instalar bash (opcional pero útil para VSCode)
RUN apk add --no-cache bash git openssh

# Crear carpeta de trabajo
WORKDIR /app

# Setear usuario no root
USER node
