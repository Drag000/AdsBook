
# AdsBook
## Table of Contents
 * [Project Overview](#project-overview)
 * [Features](#features)
 * [Tech Stack](#tech-stack)
 * [Architecture](#architecture)
 * [Authentication](#authentication)
 * [API Documentation](#api-documentation)


## Project Overview
AdsBook is a web application for users to post, browse, and manage advertisements. The project consists of a Django REST framework (DRF) backend that serves a RESTful API with token-based authentication and a React frontend that interacts with the API.


## Features
* User authentication and authorization with token-based authentication
* Create, read, update, and delete (CRUD) operations for ads
* Commenting on ads
* User profile management
* Responsive UI with React


## Tech Stack
###  Backend
* Django: Python web framework
* Django REST Framework (DRF): For building RESTful APIs
* PostgreSQL: Database
* Django REST Framework token authentication: For token-based authentication

### Frontend
* React: JavaScript library for building user interfaces
* JavaScript: For making HTTP requests from React to the backend API
* Bootstrap CSS: For UI design


## Architecture
### Backend
Currently includes 3 main apps - accounts, ads and common

* accounts - Based on default User model. WIP - to be extended with more user info via additional OneToOne model, user rating, and more.
* ads - App for managing ads with CRUD operations. WIP - add photo management, ads categorization, search, sort and filter services 
* common - Currently manages only comments services. Each user can add (and delete his/her) comments under each ad.

### Frontend
React fetches data from the backend and displays it to the user.

Component oriented based on functional components.

WIP - HTML / CSS, requests optimization and others.


## Project Structure
### Backend (Django)
```
backend/
│
├── accounts/               # App for auth and user management
├── ads/                    # App for ads management
├── common/                 # App for comments management and others
│   ├── comments/
├── settings.py             # Django settings
└── urls.py                 # Project URL configuration
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
│   └── index.js            # Entry point
└── package.json            # Frontend dependencies
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

`GET` `/auth/logout/` including token - Loggout. Response with status 200, "Successfully logged out.".

### Ads app
*You need to send an authorized request for all endpoints below.*

**Endpoints**

`POST` `/ads/create/` - Create ad. Response with status 201, and ad deitals.

`GET` `/ads/` - Get all ads.Response with status 200, and ads deitals.

`GET` `/ads/myads/` - Get my ads - Response with status 200, and all ads deitals posted by the logged in user.

`GET` `/ads/<int:pk>/details/` - Get ad details. Response with status 200, and the ad deitals.

`GET` `/ads/<int:pk>/edit/` - Edit ad. Returns response with status 200, and the updated ad deitals.

`DELETE` `/ads/<int:pk>/delete/` - Delete ad. Returns an empty response with status 204.

### Common app
*You need to send an authorized request for all endpoints below.*

**Endpoints**

`POST` `/common/comments/<int:ad_id>/create/` - Create comment. Response with status 201, and ad deitals.

`GET` `/common/comments/<int:ad_id>/all/` - Get all comments for ad. Response with status 200, and ads deitals.

`DELETE` `/common/comments/delete<int:pk>/` - Delete comment. Empty response with status 204.

