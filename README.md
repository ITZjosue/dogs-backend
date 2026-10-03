# Dogs API (backend)

API REST hecha con **Express** y **Sequelize** (PostgreSQL) que consulta las razas de perro de [TheDogAPI](https://thedogapi.com) y permite crear razas propias, que se guardan en la base de datos junto con sus temperamentos.

## Endpoints

| Método | Ruta                   | Descripción                                                            |
| ------ | ---------------------- | ---------------------------------------------------------------------- |
| GET    | `/dogs`                | Lista todas las razas (API + base de datos)                            |
| GET    | `/dogs?name=<texto>`   | Filtra las razas por nombre                                            |
| GET    | `/dogs/:idRaza`        | Detalle de una raza                                                    |
| GET    | `/temperament`         | Lista los temperamentos (los carga desde la API la primera vez)        |
| POST   | `/dog`                 | Crea una raza nueva                                                    |

Ejemplo de body para `POST /dog`:

```json
{
  "nombre": "Mi raza",
  "alturaMin": 30,
  "alturaMax": 40,
  "pesoMin": 10,
  "pesoMax": 15,
  "vida": "12 - 14 years",
  "temperamento": ["Friendly", "Playful"]
}
```

## Requisitos

- Node.js >= 12.18.3 y npm >= 6.14.6
- Docker y Docker Compose (para la base de datos)
- Una API key de [TheDogAPI](https://thedogapi.com)

## Levantar el proyecto en local

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Configurar las variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Completa `API_KEY` con tu clave de TheDogAPI. El resto de valores ya funcionan con la base de datos de Docker.

3. **Levantar la base de datos** (PostgreSQL 17 en Docker)

   ```bash
   npm run db:up
   ```

4. **Iniciar el servidor**

   ```bash
   npm run dev   # con nodemon (recarga automática)
   # o
   npm start
   ```

   La API queda disponible en `http://localhost:3001` (o el puerto definido en `PORT`).

> **Nota:** al iniciar, el servidor ejecuta `conn.sync({ force: true })`, por lo que **las tablas se recrean y los datos se borran en cada arranque**.

## Scripts útiles

| Script             | Descripción                                          |
| ------------------ | ---------------------------------------------------- |
| `npm start`        | Inicia el servidor                                   |
| `npm run dev`      | Inicia el servidor con nodemon                       |
| `npm test`         | Ejecuta los tests con mocha (modo watch)             |
| `npm run db:up`    | Levanta el contenedor de PostgreSQL                  |
| `npm run db:down`  | Detiene el contenedor                                |
| `npm run db:reset` | Borra el volumen y recrea la base de datos desde cero |
| `npm run db:psql`  | Abre una consola `psql` dentro del contenedor        |

## Variables de entorno

| Variable       | Descripción                                                  | Valor por defecto   |
| -------------- | ------------------------------------------------------------ | ------------------- |
| `PORT`         | Puerto del servidor                                          | `3001`              |
| `DB_USER`      | Usuario de PostgreSQL                                        | `postgres`          |
| `DB_PASSWORD`  | Contraseña de PostgreSQL                                     | `postgres`          |
| `DB_HOST`      | Host y puerto de la base de datos                            | `localhost:5432`    |
| `DB_NAME`      | Nombre de la base de datos                                   | `dogs`              |
| `DB_PORT`      | Puerto expuesto por el contenedor de Docker                  | `5432`              |
| `DB_SSL`       | Usar SSL en la conexión (`true` en producción)               | `false`             |
| `DATABASE_URL` | (Opcional) URL de conexión completa; reemplaza a las `DB_*`  | —                   |
| `API_KEY`      | API key de TheDogAPI                                         | —                   |
