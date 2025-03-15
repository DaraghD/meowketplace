# Frontend development

## Docker
- ```docker build -t meow .``` 
- ```docker run -p 8888:80 meow``` 
- Go to  ```localhost:8888``` on your browser to see the app
- npm run dev doesn't completely replicate the production environment, so it's better to use docker for testing

## Npm 
- ```npm install```
- ```npm run dev```
- Should give a link to the running app
- Is faster to iterate on compared to docker, but has differences compared to production