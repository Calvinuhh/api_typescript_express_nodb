## Guia para arrancar el proyecto localmente

# Tecnologias implementadas:

`TypeScript, Node.js, Express`

La version de **Node** implementada es la `22.11.0` se debe correr el proyecto localmente con dicha version o con una version superior ya que en **Node** ahora se pueden leer variables de entorno de manera nativa con el siguiente metodo:

```typescript
process.loadEnvFile();
```

Esto hace que se lean las variables de entorno que vienen por defecto en un archivo `.env` y no se necesite necesite la libreria tipicamente utilizada **dotenv** para la lectura de las variables de entorno.

se puede hacer uso de **Nvm** (Node Version Manager) para instalar dicha version, Ahora a continuacion se explicara el paso a paso para arrancar el proyecto de manera local

Primeramente se clonara el repositorio del GitHub del siguiente enlace:

[Repositorio GitHub](https://github.com/Calvinuhh/api_typescript_express_nodb) - `https://github.com/Calvinuhh/api_typescript_express_nodb`

Se dara click en el cuadro azul que dice **"Code"** para luego darle click a **"Copy url to clipboard"**

<img src="./images/Screenshot 2024-11-15 075654.png" width=350px>
<img src="./images/Screenshot 2024-11-15 080756.png" width=300px>

Esto hara que el link del repositorio de GitHub sea copiado al portapapeles y se pueda pegar.

Ahora se creara una nueva carpeta en cualquier lugar en donde se pueda guardar el repositorio.

Una vez creada la carpeta nueva se abrira la terminal en la ubicacion de dicha carpeta creada, bien puede ser de **PowerShell, Bash o Cmd**.

Se escribira el comando `git clone` y seguido se pegara la url del repositorio de git de esta manera:

```
git clone https://github.com/Calvinuhh/api_typescript_express_nodb.git
```

Una vez clonado el repositorio entraremos en dicha carpeta con el comando:

```
cd api_typescript_express_nodb
```

En dicha carpeta tendremos varias carpetas y archivos, principalmente la carpeta `src` en donde estara todo el codigo del servidor, luego tendremos el archivo **README.md**, el **package.json**, **package-lock.json**, **.gitignore**, **tsconfig.json**, la carpeta **images** que no le daremos importancia y lo mas importante el archivo `.env.demo`.

Este aspecto es super importante porque el metodo `process.loadEnvFile()` lee por defecto un archivo `".env"` por lo que no leera el archivo `.env.demo`.

Si se quiere arrancar el proyecto hay dos opciones, la primera opcion sera indicar en el archivo **index.ts** de la carpeta `src` en el metodo `process.loadEnvFile()` el arhivo que debe leer.

Aqui esta el bloque de codigo resultante para el archivo `index.ts` en `src` para la lectura de las variables de entorno para el archivo `.env.demo`:

```typescript
import server from "./server";

process.loadEnvFile("./.env.demo");

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
```

La segunda opcion es mas sencilla, sera simplemente sera cambiar el nombre del archivo `.env.demo` a `.env`.

El archivo `.env.demo` por defecto no trae las variables de entorno necesarias, solo un texto descriptivo:

```
PORT=(PUERTO DEL SERVIDOR)
```

A `PORT` se le asignara el puerto de preferencia disponible para que el servidor escuche, por ejemplo **3000**.

Ahora procederemos con la instalacion de las dependencias, con el comando:

```
npm install
```

Se creara la carpeta ***node_modules*** en donde alli estaran las dependencias que necesitaremos para el proyecto.

Ya con estos pasos ya podremos correr el proyecto de manera local, si se quiere usar el codigo compilado de **_Typescript_** a **_JavaScript_** primeramente se utilizara el comando `npm run tsc`, esto creara una carpeta llamada **dist** en donde estara el codigo compilado en **_JavaScript_**, para arrancar el servidor se utilizara el comando `npm start`.

O tambien si se quiere utilizar un watcher implementando la libreria **ts-node-dev** ya esta el comando predefinido: `npm run dev`

### npm start:

```
> express_typescript@1.0.0 start
> node dist/index.js

Server listening on http://localhost:3000
```

### npm run dev:

```
> express_typescript@1.0.0 dev
> ts-node-dev src/index.ts

[INFO] 09:21:27 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.6.3)
Server listening on http://localhost:3000
```

Si todo salio bien el servidor estara escuchando correctamente.

## Endpoints

Se pueden hacer las tipicas peticiones de un **_CRUD_**, tales como obtener todos los datos, obtener un dato por _ID_, hacer un **POST** para subir un recurso al servidor, *actualizar* un dato o *eliminar* un dato.

Para probar los endpoints se recomienda utilizar un rest client como **_Postman_** o **_Insomnia_**

El principal endpoint es el siguiente (poniendo como ejemplo el puerto **4000**): http://localhost:4000/data

Aqui se dejara un ejemplo grafico de las peticiones que se pueden realizar:

![alt text](<images/Screenshot 2024-11-15 092659.png>)

Si se hace una peticion **GET** a http://localhost:4000/data devolvera la respuesta `Data not found`, esto es porque el Array que esta almacenando los datos esta **vacio**.

En el archivo `src/services/arrayDataServices.ts` se encontrara el Array que contendra los datos y abajo unas lineas de codigo comentadas:

```typescript
import PersonData from "../interfaces/PersonInterface";
import { PersonDTO } from "../DTOs/personsDTOs";
import { v4 } from "uuid";

let data: Array<PersonData> = [];

// data.push({ id: v4(), name: "Jhon", lastName: "Doe", age: 30 });
// data.push({ id: v4(), name: "Jane", lastName: "Doe", age: 25 });
```

Si se descomentan, cuando se realice la peticion **GET** a http://localhost:4000/data, en esta ocasion si obtendremos datos para testear la peticion, obtendremos estos resultados:

```json
[
  {
    "id": "f78dc69e-a2e7-49f8-891c-a9acbb6765e1",
    "name": "Jhon",
    "lastName": "Doe",
    "age": 30
  },
  {
    "id": "77ff2861-4d70-46ea-90b6-f7966046ea6c",
    "name": "Jane",
    "lastName": "Doe",
    "age": 25
  }
]
```

En la consola del proyecto se podra observar que se obtienen los codigos de respuesta del servidor, esto es por la implementacion de la libreria **_morgan_**:

```powershell
Server listening on http://localhost:3000
GET /data 200 1.953 ms - 173
DELETE /data/f78dc69e-a2e7-49f8-891c-a9acbb6765e1 404 12.595 ms - 18
POST /data 201 1.645 ms - 63
GET /data/f78dc69e-a2e7-49f8-891c-a9acbb6765e1 404 0.509 ms - 18
```

Se podra buscar por _ID_ un elemento especifico a http://localhost:4000/data/:id, si se busca el segundo elemento, poniendo el _ID_ del ejemplo anterior (http://localhost:3000/data/77ff2861-4d70-46ea-90b6-f7966046ea6c) se obtendra esto:

```json
{
  "id": "77ff2861-4d70-46ea-90b6-f7966046ea6c",
  "name": "Jane",
  "lastName": "Doe",
  "age": 25
}
```

Ahora realizando una peticion **POST** a http://localhost:4000/data, enviando por **_Body_** los datos del recurso, este podria ser un ejemplo:

```json
{
  "name": "calvin",
  "age": 26,
  "lastName": "howard"
}
```

Y obtendremos el mensaje `"data created"` y los datos que le enviamos por **_Body_**:

```json
{
  "data created": {
    "name": "calvin",
    "age": 26,
    "lastName": "howard"
  }
}
```

el _ID_ se genera automaticamente como un UUIDv4, por lo que no es necesario indicarlo.

Ahora si volvemos a hacer una peticion **GET** para ver todos los datos podremos ver que el nuevo elemento se almaceno en el _Array_:

```json
[
  {
    "id": "f78dc69e-a2e7-49f8-891c-a9acbb6765e1",
    "name": "Jhon",
    "lastName": "Doe",
    "age": 30
  },
  {
    "id": "77ff2861-4d70-46ea-90b6-f7966046ea6c",
    "name": "Jane",
    "lastName": "Doe",
    "age": 25
  },
  {
    "id": "d8fc18c2-057f-4b82-b721-4772dfbe2b29",
    "name": "calvin",
    "lastName": "howard",
    "age": 26
  }
]
```

Si queremos actualizar el primer elemento realizaremos una peticion **PUT**, indicandole por parametro el _ID_ del primer elemento.

Pasandole por **_Body_** a http://localhost:3000/data/f78dc69e-a2e7-49f8-891c-a9acbb6765e1 :

```json
{
  "name": "another",
  "age": 23,
  "lastName": "person"
}
```

La respuesta del servidor seria esta:

```json
"Jhon Doe was updated, new data: name: another, lastName: person, age: 23"
```

Si volvemos a realizar un **GET** a todos los recursos podemos ver que el primer elemento fue actualizado, (el _ID_ sigue siendo el mismo):

```json
[
  {
    "id": "f78dc69e-a2e7-49f8-891c-a9acbb6765e1",
    "name": "another",
    "lastName": "person",
    "age": 23
  },
  {
    "id": "77ff2861-4d70-46ea-90b6-f7966046ea6c",
    "name": "Jane",
    "lastName": "Doe",
    "age": 25
  },
  {
    "id": "d8fc18c2-057f-4b82-b721-4772dfbe2b29",
    "name": "calvin",
    "lastName": "howard",
    "age": 26
  }
]
```

Ahora para probar el DELETE eliminaremos el primer recurso, a esta ruta: http://localhost:3000/data/:id

Poniendo como ejemplo http://localhost:3000/data/f78dc69e-a2e7-49f8-891c-a9acbb6765e1

El resultado seria:

```json
"another person was deleted"
```

Si lo buscamos por _ID_ individualmente (http://localhost:3000/data/f78dc69e-a2e7-49f8-891c-a9acbb6765e1) el resultado seria:

```json
"Person not found"
```

Y si volvemos a realizar una peticion **GET** a todos los recursos encontraremos que el elemento previamente eliminado no esta:

```json
[
  {
    "id": "77ff2861-4d70-46ea-90b6-f7966046ea6c",
    "name": "Jane",
    "lastName": "Doe",
    "age": 25
  },
  {
    "id": "d8fc18c2-057f-4b82-b721-4772dfbe2b29",
    "name": "calvin",
    "lastName": "howard",
    "age": 26
  }
]
```
