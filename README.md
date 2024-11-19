# Proyecto AdoptMe

AdoptMe es un proyecto de JavaScript diseñado para gestionar procesos relacionados con adopciones de mascotas. Esta aplicación ofrece funcionalidades clave y es completamente compatible con Docker para facilitar su despliegue y uso.

---

## **Características**

- Gestión sencilla de adopciones.
- Compatible con múltiples plataformas.
- Facilita el despliegue mediante Docker.
- Incluye documentación interactiva de los endpoints mediante Swagger, permitiendo una navegación y prueba sencilla de la API.
- **Tests unitarios integrados con Mocha** para asegurar la calidad del código.

---

## **Requisitos previos**

Asegúrate de tener instalado Docker Desktop:
- [Docker-Desktop](https://www.docker.com/get-started)

---

## **Cómo ejecutar AdoptMe con Docker**

### **1. Obtener la imagen desde Docker Hub**

La imagen de Docker está disponible públicamente en Docker Hub (https://hub.docker.com/r/guzman23/adoptme-pf-alvaro-olivera). Puedes descargarla ejecutando:

`docker pull guzman23/adoptme-pf-alvaro-olivera:latest`

### 2. Ejecutar el contenedor

Para iniciar la aplicación, ejecuta:

`docker run -d -p 8081:8080 guzman23/adoptme-pf-alvaro-olivera:latest`

-d: Ejecuta el contenedor en segundo plano (modo "detached").

-p 8081:8080: Mapea el puerto `8080` del contenedor al puerto `8081` de tu máquina host.

### 3. Accede a la aplicación en tu navegador:

Visita `http://localhost:8081`

### Accede a la documentación interactiva de los endpoints en:  

`http://localhost:8081/apidocs`

## Tests unitarios con Mocha

El proyecto incluye tests unitarios escritos en Mocha para garantizar la funcionalidad de los DAOs de adopciones y usuarios. Estos tests evalúan la lógica de negocio y la interacción con la base de datos.

### Ubicación de los tests

Los tests están ubicados en el repositorio de GitHub dentro del archivo:

`tests/supertest.test.js` - Valida las operaciones relacionadas con adopciones y usuarios.

### Ejecución de los tests

#### 1. Clona el repositorio:

`git clone https://github.com/GuzmanOlivera/PFOliveraFervenzaAlvaroGuzman.git`
`cd PFOliveraFervenzaAlvaroGuzman`

#### 2. Instala las dependencias necesarias:

`npm install`

#### 3. Configura la variable de entorno `MONGO_URI` en el archivo .env que deberás crear en la raíz del proyecto. Ejemplo de valor:

`MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0"`

#### 4. Ejecuta los tests:

`npm run test`

#### Consideraciones

Los tests utilizan datos de prueba completamente inventados (ej., nombres de usuarios, contraseñas y correos electrónicos).

Los datos generados por los tests son eliminados de la base de datos al finalizar cada prueba, asegurando un entorno limpio.