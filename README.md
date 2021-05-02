# IOT-FRONTEND

## Built with
- Vue 3, Vue Router 4, Vuex 4
- TypeScript
- VeeValidate, yup
- Axios
- Bootstrap 5

## **IMPORTANT**: Set the backend services
Create a file named `.env.local` as a copy of `.env` file and set the url for backend services. Check that backend services are running:

- [User Service Authentication](https://github.com/edwbadillo/iotservices-userservice) 

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

## Run with Docker
Build the container:

```
docker build --pull --rm -f "Dockerfile" -t iot-frontend "."
```

Run the container:
```
docker run -it -p 80:80 --name iot-frontend iot-frontend
```