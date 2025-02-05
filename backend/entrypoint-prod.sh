#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
# Checks if the PostgreSQL service on DB_HOST (=test_db_container) is reachable on port 5432.
# If the check fails, the script waits for 1 second before retrying. 
while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done
echo "PostgreSQL is up and running!"

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start the Django development server
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3