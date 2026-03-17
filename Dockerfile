# Usa una imagen base de Node.js ligera
FROM node:18-alpine

# Crea el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de tu aplicación
COPY . .

# Expone el puerto 3000 (el que configuramos en el deploy)
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["node", "app.js"]
