FROM node:23 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN echo "VITE_API_URL=http://meowketplace.ie:8080/api" > .env

RUN cat .env

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]