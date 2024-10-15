## Project setup

```bash
$ npm install
```

## Start up Docker Postgres Database

Make sure you have docker installed on your computer. Then in your terminal cd into the main directory file and run:

```bash
$ docker compose up
```

This will start up the postgres database in docker locally on your computer.

If you would like some seed data to test with in the database, run this from the main directory in your terminal after the docker postgress database is up and running:

```bash
$ npx prisma db seed
```

## Compile and run the project

Once the docker postgres database is up and running, and you've seeded the database, start up the NestJS app by running:

```bash
# watch mode
$ npm run start:dev
```

## Swagger Doc

After the NestJS app is running, navigate to `localhost:3000/api` to see the Swagger API docs of this project. Try out the different APIs in the Swagger docs, use the Swagger docs as a reference and test the APIs in Postman.

## Run tests

```bash
# unit tests
$ npm run test
```
