FROM python:3.12-slim AS backend
# Install required system packages (including netcat as netcat is not in 3.12-slim, but it is needed in entrypoint.sh)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    dos2unix \
    netcat-openbsd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./backend .
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
RUN python manage.py collectstatic
RUN chmod +x /app/entrypoint-prod.sh
RUN dos2unix /app/entrypoint-prod.sh
ENTRYPOINT ["./entrypoint-prod.sh"]


FROM node:20-slim AS frontend
WORKDIR /app
EXPOSE 5173
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run build
RUN echo "window.env = { VITE_BACKEND_URL: '\$VITE_BACKEND_URL' };" > /app/dist/env.template.js

FROM nginx:latest AS nginx
RUN apt-get update && apt-get install -y gettext-base
RUN rm /etc/nginx/conf.d/default.conf
ENV BACKEND_URL=""
ENV VITE_BACKEND_URL=""
EXPOSE 443
COPY nginx/conf.d /etc/nginx/conf.d
COPY --from=backend /app/staticfiles /usr/share/nginx/html/static
COPY --from=frontend /app/dist /usr/share/nginx/html/react
CMD ["/bin/sh", "-c", "envsubst '${VITE_BACKEND_URL}' < /usr/share/nginx/html/react/env.template.js > /usr/share/nginx/html/react/env.js && \
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf && \
nginx -g 'daemon off;'"]


