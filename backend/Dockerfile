FROM python:3.12-slim AS base

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

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory into the container
COPY . .

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000
# Ensure entrypoint.sh has execution permissions
RUN chmod +x /app/entrypoint.sh
RUN dos2unix /app/entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

