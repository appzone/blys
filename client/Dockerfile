FROM node:lts as build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run build
 

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
