
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
AdsBook is a web application for users to post, browse, and manage advertisements. The project consists of a Django REST framework (DRF) backend that serves a RESTful API with token-based authentication and a React frontend that interacts with the API.
The focus is not on the UX (as of now), but rather than functionality, dockerization and using terraform for deployment in Azure.
The app is dockerized. You can clone and start it on your machine via docker-compose.
There is terraform code for testing purposes to deploy it in Azire as containerized apps and postgresql database. As of now the apps starts development servers instead of production-ready environments.
Link to Azure - https://adsbook-frontend.victoriousflower-6076ba40.northeurope.azurecontainerapps.io/


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
├── backend/                    # backend
├── client/                     # frontend
└── docker-compose.yml
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
├── entrypoint.sh               # Script for running migrations and starting Django development server in Dockerfile
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
├── index.js                
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

### Docker Setup
The application can be run by Docker using the docker-compose file in the main folder. Moreover there are 2 Dockerfiles for building images- 1 for frontend image in client folder and 1 for backend image in backend folder.

Steps:
1. Navigate to the main directory:
```
cd adsbook
```

2. Build frontend and backend images:
```
docker-compose build
```

3. Starts the containers and test the application:
```
docker-compose up -d
```

Frontend starts on http://localhost:5173/ and backend starts on http://localhost:8000/

### Terraform Setup
Currently this Terraform configuration is intended only for testing purposes to deponstrate the usage of Terraform to deploy containerized apps in Azure cloud.**As of now the apps starts development servers instead of production-ready environments.** Django app (python manage.py runserver 0.0.0.0:8000) and the React aapp (npm run dev -- --host)
(WIP) To set up production environment instead of development servers.

Steps:
1. After cloning the repo you must update the settings for the backend host. Go to client/src/api/config-api.js and comment out line 6 `export const BASE_URL = 'http://localhost:8000'` and uncomment line 3 `export const BASE_URL = import.meta.env.VITE_BACKEND_URL;`
```
cd adsbook
```

2. Build frontend and backend images:
```
docker-compose build
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

