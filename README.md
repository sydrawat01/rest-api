# REST API

This is a basic skeleton code to create a basic REST API using NodeJS, ExpressJS and Babel.

> NOTE: Please note that this is still a work in progress, I plan to release this as a simple starter template to create a simple REST API.

## Features

- ES7+
- NodeJS
- ExpressJS
- Babel (to transpile code to older version of ECMA Script)
- Winston for logging
- Basic test scripts
- Custom error handlers

## Planned features

- PostgreSQL and Sequelize
- Bcrypt
- AWS S3, DynamoDB and SNS Topics
- Email verification of user
- TypeScript support
- Dockerization

## Connect to local db

```shell

psql postgres

CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;

psql -d postgres -U me

CREATE DATABASE test;

\c test

select * from users;
```

## Docker

This is an example repository that will help you dockerize your Node+Express application using Docker.

1. Create a simple REST API with the following endpoints:

- `/` that returns OK status code (200)
- `/health` that returns OK status code(200)

2. Create a simple test that checks the health routes.

3. Create a new file named `Dockerfile` at the root of the repository.

4. Add the following configuration to the above created file:

```docker
# which node to use for your container
FROM node:alpine

# the directory where the appication will be copied to in your container
WORKDIR /usr/src/app

# copy the contents of the base(app) directory to the container WORKDIR
COPY . .

# commands to run to install dependencies
RUN npm install

# port that must be exposed to the client where the application is running in the container
EXPOSE 3000

# command to start the application in the container
CMD ["yarn", "start"]
```

5. Now, to create an image of your basic REST API:

```shell
# -t option to tag the image with a version
# if a version is not provided, the default tag is 'latest'
# the '.' option at the end is to build the current working directory
docker build -t <image-name>:<image-version> .
```

Example:

```shell
docker build -t api:v1 .
```

To create a docker image using another version of a `Dockerfile`, use the following command:

```shell
docker build -t <image-name>:<image-version> -f <Dockerfile-name> .
```

Example:

```shell
docker build -t api:v2 -f Dockerfile.dev .
```

6. To verify your image is build and ready:

```shell
# lists all images that docker has built or pulled from docker hub
docker images
```

7. To create and run a container:

```shell
# -ti is to run the container in an interactive terminal mode
# --name is to name your container
# -p is to expose the port from the container to the local machine where the container is running
docker run -ti --name <container-name> \
-p <local-machine-port>:<container-port> \
<image-name>:<image-version>
```

Example:

```shell
docker run -ti --name rest-api-container -p 3000:1337 api:v1
```

8. Test the API endpoints using `Postman` on `http://localhost:3000`.

### Docker bind mount

The `-v` flag represents the volume in our container, where our application will be uploaded in the Docker Ubuntu image.

```shell
docker run --name <container-name> \
-p <local-machine-port>:<container-port> \
-v <local-machine-dir>:<container-WORKDIR-PATH> \
<image-name>:<image-version>
```

Example:

```shell
docker run --name rest-api-container-2 \
-p 3000:1337 \
-v $(pwd):/usr/src/app \
api:v1
```

> NOTE: If you are on a windows computer, `$(pwd)` will not work. Instead, use `%cd%`.

### Anonymous volume

To leave the `node_modules` directory untouched in the local machine directory, and to not track it in the docker container, we use anonymous volumes.

```shell
docker run --name <container-name> \
-p <local-machine-port>:<container-port> \
-v <local-machine-dir>:<container-WORKDIR-PATH> \
-v <container-WORKDIR/node_modules> \
<image-name>:<image-version>
```

Example:

```shell
docker run --name rest-api-container-3
-p 3000:1337 \
-v $(pwd):/usr/src/app \
-v /usr/src/app/node_modules \
api:v1
```

Since we do not have the `:` colon to link this volume in our container to the local machine directory, this is an anonymous volume.

### SSH into a container

```shell
docker exec -ti <container-name> /bin/sh
```

Example:

```shell
docker exec -ti rest-api-container-3 /bin/sh
```

### Stop and delete containers

1. Look for the container name:

```shell
docker ps
```

2. Stop the container using the container name:

```shell
docker stop <container-name>
```

Example:

```shell
╰─ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                    NAMES
15fa4c6bbd11   api:v2    "docker-entrypoint.s…"   8 seconds ago   Up 6 seconds   0.0.0.0:3000->1337/tcp   rest-api
```

```shell
docker stop rest-api
```

3. To check for stopped containers:

```shell
docker ps -a
```

4. Make sure that the container is stopped, then proceed to remove that container.

```shell
docker ps;
docker rm <container-name>
```

Example:

```shell
docker rm rest-api
```

### Work in progress

Do not build `.env` into the docker image. 