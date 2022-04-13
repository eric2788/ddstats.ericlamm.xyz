# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM steebchen/nginx-spa:stable
COPY --from=build-stage /app/dist/ /app
EXPOSE 80
CMD ["nginx"]