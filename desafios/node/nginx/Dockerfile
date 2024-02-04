FROM nginx:1.15.0-alpine
COPY index.html /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d