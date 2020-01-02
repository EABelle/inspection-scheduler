FROM node:10.15.3
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE ${EXTERNAL_SERVER_PORT}
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
