
# AdsBook
## Table of Contents
 * [Project Overview](#project-overview)
 * [Features](#features)
 * [Tech Stack](#tech-stack)
 * [Architecture](#architecture)
 * [Project Structure](#project-structure)
 * [Getting Started](#getting-started)
 * [Authentication](#authentication)
 * [API Documentation](#api-documentation)


## Project Overview
AdsBook is a web project for users to post, browse, and manage advertisements. The project consists of a Django REST framework (DRF) backend that serves a RESTful API with token-based authentication and a React frontend that interacts with the API.
The focus is not on the UX (as of now), but rather than functionality, dockerization and using terraform for deployment in Azure.
The app is dockerized. You can clone and start it on your machine via docker-compose.dev.yml file.
There is terraform code for deployment in Azure as containerized apps and postgresql database by building docker images and pushing them to container registry.
Link to Azure - https://adsbook-nginx.wittyplant-4a59d1f6.northeurope.azurecontainerapps.io/


## Features
* User authentication and authorization with token-based authentication
* Create, read, update, and delete (CRUD) operations for ads
* Commenting on ads
* User profile management
* Responsive UI with React (WIP)


## Tech Stack
###  Backend
* Django: Python web framework
* Django REST Framework (DRF): For building RESTful APIs
* PostgreSQL: Database
* Django REST Framework token authentication: For token-based authentication

### Frontend
* React: JavaScript library for building user interfaces
* JavaScript: For making HTTP requests from React to the backend API
* Bootstrap CSS: For UI design (WIP)


## Architecture
### Backend
Currently includes 3 main apps - accounts, ads and common

* accounts - Based on default User model. WIP - to be extended with more user info via additional OneToOne model, user rating, and more.
* ads - App for managing ads with CRUD operations. WIP - add photo management, ads categorization, search, sort and filter services 
* common - Currently manages only comments services. Each user can add (and delete his/her) comments under each ad.

### Frontend
React fetches data from the backend and displays it to the user.

Component oriented based on functional components.

HTML / CSS bootstrap implementation for all pages, requests optimization, forms and validations improvements (react-hook-form to be installed) and others (WIP).


## Project Structure
```
adsbook/
│
├── .github                     #github actions
├── backend/                    # backend 
├── client/                     # frontend
├── nginx                       # nginx config file for production  
├── terraform/                  # terraform files
├── .dockerignore
├── docker-compose.dev.yml      # docker-compose set up for development testing
├── docker-compose.prod.yml     # docker-compose set up for building frontend, backend and nginx images for deployment in Azure via Terraform
├── prod.Dockerfile             # Dockerfile for deployment
└── README.md

```

### Backend (Django)
```
backend/
│
├── backend/
│   │
│   ├── accounts/               # App for auth and user management
│   ├── ads/                    # App for ads management
│   ├── common/                 # App for comments management and others
│   │   ├── comments/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Project URL configuration
│   └── wsgi.py
├── env/                        
│   ├── .env.test               # Configuration file for the main Django settings as environments
├── tests/                      # Tests
├── .dockergnore
├── .gitignore
├── Dockerfile                  # Dockerfile for building backend image
├── entrypoint-prod.sh          # Script for running migrations,collecting static files and starting gunicorn server
├── entrypoint.sh               # Script for running migrations and starting Django development server
├── manage.py
└── requirements.txt
```

### Frontend (React)
```
client/
│
├── src/
│   ├── api/                # API services
│   ├── components/         # Reusable components
│   ├── contexts/           # Auth context management
│   ├── hooks/              # App hooks
│   ├── App.js              # Main application component
│   └── main.jsx
├── .dockergnore
├── eslintrc.cjs
├── .gitignore      
├── Dockerfile              # Dockerfile for building frontend image
├── index.html    
├── LICENSE
├── package-lock.json       
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite config
```


## Getting Started
### Installation
Clone the repository
```
git clone https://github.com/Drag000/AdsBook
```

### Backend Setup
There is testing configuration file (env.test) for the main Django settings as environments in backend/env/. Defauld settings are for testing purposes, hence you can update them if you need.

### Docker Setup for development
The application can be run by Docker using the docker-compose file in the main folder. Moreover there are 2 Dockerfiles for building images- 1 for frontend image in client folder and 1 for backend image in backend folder.

Steps:
1. Navigate to the main directory:
```
cd adsbook
```

2. Build frontend and backend images and starts the containers:
```
docker-compose -f docker-compose.test.yml up -d
```

Frontend starts on http://localhost:5173/ and backend starts on http://localhost:8000/

### Docker + Terraform Setup for deployment in Azure
There is a docker-compose.prod.yml file for building frontend, backend and nginx images, which are used for deploying the project via Terraform in Azure as containerized apps.

Steps:
1. After cloning the repo you must update the settings for the backend host. Go to client/src/api/config-api.js and comment out line 6 `export const BASE_URL = 'http://localhost:8000/api'` and uncomment line 3 "export const BASE_URL = `${window.env?.VITE_BACKEND_URL}/api`;"

2. Build frontend, backend and nginx images:
```
docker-compose.prod.yml build
```

3. Update you Azure subsription id. Go go terraform/values.tfvar and update 'subscription_id'

4. Execute terraform commands:
```
terraform validate
```
```
terraform plan -var-file="values.tfvars"
```
```
terraform apply -var-file="values.tfvars"
```

## Authentication
The application uses token-based authentication. Users need to log in to receive a token, which must be included in the Authorization header for subsequent requests.

```
Authorization: Token {token}
```


## API Documentation
### Accounts app
**Endpoints**

`POST` `/auth/register/` with required properties username, email and password - Register. Response with status 201 with user details.

`POST` `/auth/login` with required properties username and password) - Login. Response with status 200 and object, containing user info and standard string token, that can be used for requests.

*You need to send an authorized request for all endpoints below.*

`POST` `/auth/logout/` - Loggout. Response with status 200, "Successfully logged out.".

`GET` `/auth/<int:pk>/details/` - Get User Details. Response with status 200 and object, containing user info.

`PUT` `/auth/<int:pk>/edit/` - Edit User Details. Response with status 200 and object, containing user info.

`PUT` `/auth/<int:pk>/change-password/` - Change User Password. Response with status 200 and object, containing user info.
 
`DELTE` `/auth/<int:pk>/delete/` - Delete User profile. Returns an empty response with status 204. Response with status 200, "Password changed successfully."


### Ads app
*You need to send an authorized request for all endpoints below.*

**Endpoints**

`POST` `/ads/create/` - Create ad. Response with status 201, and ad deitals.

`GET` `/ads/` - Get all ads.Response with status 200, and ads deitals.

`GET` `/ads/myads/` - Get my ads - Response with status 200, and all ads deitals posted by the logged in user.

`GET` `/ads/<int:pk>/details/` - Get ad details. Response with status 200, and the ad deitals.

`PUT` `/ads/<int:pk>/edit/` - Edit ad. Returns response with status 200, and the updated ad deitals.

`DELETE` `/ads/<int:pk>/delete/` - Delete ad. Returns an empty response with status 204.

### Common app
*You need to send an authorized request for all endpoints below.*

**Endpoints**

`POST` `/common/comments/<int:ad_id>/create/` - Create comment. Response with status 201, and ad deitals.

`GET` `/common/comments/<int:ad_id>/all/` - Get all comments for ad. Response with status 200, and ads deitals.

`DELETE` `/common/comments/delete<int:pk>/` - Delete comment. Empty response with status 204.

