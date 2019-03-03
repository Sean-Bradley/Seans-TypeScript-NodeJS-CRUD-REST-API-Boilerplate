## Seans-TypeScript-NodeJS-CRUD-REST-API-Boilerplate 

### Setup

```bash
npm install
```

### Development with nodemon and tsc --watch

```bash
npm run dev
```

Then visit `http://localhost:3000/cats`

### Run without nodemon and tsc --watch

```bash
npm start
```

Then visit `http://localhost:3000/cats`

## Swagger

Visit `http://localhost:3000/swagger` to view the OPENAPI document in Swagger-UI
![Swagger-UI](docs/swagger.png)



### Video tutorial on setting up Swagger in an existing NodeJS TypeScript API
[![Add Swagger-UI Documentation To Existing NodeJS TypeScript API](https://img.youtube.com/vi/qemG0CWOx1I/0.jpg)](https://youtu.be/qemG0CWOx1I)

## Continuous Integration and Deployment
I've also added gitlab-ci.yml and dockerised with Docker-Compose. See video tutorial on how all this works.
[![CI/CD a NodeJS API with Docker-Compose and GitLab](https://img.youtube.com/vi/Qlj6NiOy5jM/0.jpg)](https://youtu.be/Qlj6NiOy5jM)

## Usage

### List all records
![Example Get all records](docs/get-example.png)


### Post (Create) Record
![Example Post (Create) new record](docs/post-example.png)


### Get by Id
![Example Get by ID](docs/get-id-example.png)


### Put (Update) Record
![Example Put (Update)](docs/put-example.png)


### Delete Record
![Example Delete](docs/delete-example.png)

