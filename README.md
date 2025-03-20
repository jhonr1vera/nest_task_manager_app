
# Task Manager Nest App

Backend APIRest with for task management. You will find more information in the '/api' path when running application (Swagger documentation)

#### Technologies:
- Postgres (PrismaORM) (Docker)
- NestJS

#### Functions
- CRUD for users
- CRUD for task
- CRUD for comments in tasks
- Guards for route and data protection

To access routes I use ThunderClient (Beaver token needed)
## Project setup

```bash
$ npm install
```

```bash
$ docker compose up
```

Before this, set your *ENV DATABASE_URL*

```bash
$ npx prisma db push
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file *(env.example)*

`DATABASE_URL`

`JWT_SECRET`

`ROLES_KEY`


## Authors

- [@Jhon Rivera](https://www.github.com/jhonr1vera)

