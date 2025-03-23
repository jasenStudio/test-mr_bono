
## Description

Prueba backend api rest

1. Descargar respositorio [git@github.com:jasenStudio/test-mr_bono.git](https://github.com/jasenStudio/test-mr_bono)
2. tener docker destop instalado y ejecutarlo , si no lo tiene puede descargarlo de https://www.docker.com/products/docker-desktop/ 
3. EJecutar el siguiente comando ```docker compose up --build ``` en la raiz de proyecto y verificar si el contenedor de bd esta arriba
4. copia env.template y renombrelo a .env para la variables entornos, para este proyecto ya deje configurada las credenciales por cuestion de facilidad
4. acceder a la carpeta raiz del prouecto y ejecutar ```npm install ``` y ```npx prisma migrate dev ```
5. EJeuctar ```npm run start:dev``` para iniciar el servidor.
6. visitar http://localhost:3000/docs#/ para documentacion de endpoint
7. Agrege un usuario desde a la db mediante gestor de base de datos com tableplus o workbench
https://tableplus.com/

