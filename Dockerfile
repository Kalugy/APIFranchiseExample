FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente en el contenedor
COPY . .

# Expón el puerto 3000
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]
