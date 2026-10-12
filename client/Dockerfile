#(Build Stage)
FROM node:18-alpine AS build

WORKDIR /myapp

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

#(Production Stage)
FROM nginx:alpine

COPY --from=build /myapp/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
