# typefeel

This is the backend repo for typefeel, a web application for keyboard enthusiasts.
The client repo can be found here [https://github.com/rsbear/typefeel](https://github.com/rsbear/typefeel)

Prerequisites: Docker

## Start

In terminal
```
git clone https://github.com/rsbear/type-api.git
cd type-api-master
yarn && yarn install
```

### Create the database using [Docker](https://www.docker.com/)
``docker-compose up -d``

### Connecting the database to the server
``touch ormconfig.json``
paste the following in the new json file,
username, password, port, and database need to be whatever it is you set them to be in  ``docker-compose.yml``

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "test",
  "password": "test",
  "database": "test",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrationsTableName": "custom_migration_table",
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```
### 

## Run it
```yarn dev```