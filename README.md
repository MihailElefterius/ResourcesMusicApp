# Music Library API Automation Testing

## Project Overview

This project contains automated API tests for a Music Library application.

The tests are written in JavaScript using **Jest** as the testing framework and **Supertest** for making HTTP requests and validating API responses.

The application provides user authentication and album management functionality. The test suite focuses on verifying API behaviour, HTTP status codes, authentication, authorization and resource ownership.

## Technologies Used

- JavaScript
- Node.js
- Jest
- Supertest
- REST API
- JSON
- Docker (for the application environment)

## API Test Coverage

### 1. User Registration

Tests the user registration endpoint.

| Scenario | Expected Status |
|---|---:|
| Register a new user | 200 OK |
| Register with empty credentials | 400 Bad Request |
| Register an existing user | 409 Conflict |

### 2. User Login

Tests user authentication and credential validation.

| Scenario | Expected Status |
|---|---:|
| Login with valid credentials | 200 OK |
| Login with incorrect password | 403 Forbidden |

### 3. Create Album

Tests album creation and authentication requirements.

| Scenario | Expected Status |
|---|---:|
| Create an album with a valid token | 200 OK |
| Create an album without an authentication token | 401 Unauthorized |

### 4. Retrieve Albums

Tests retrieving the available albums.

| Scenario | Expected Status |
|---|---:|
| Retrieve all albums | 200 OK |

### 5. Update Album

Tests album modification, authentication and ownership restrictions.

| Scenario | Expected Status |
|---|---:|
| Update an existing album as its owner | 200 OK |
| Update a non-existing album | 404 Not Found |
| Update another user's album | 403 Forbidden |

### 6. Delete Album

Tests album deletion and access control.

| Scenario | Expected Status |
|---|---:|
| Delete an album as its owner | 200 OK |
| Delete another user's album | 403 Forbidden |
| Delete without an authentication token | 401 Unauthorized |
| Delete a non-existing album | 404 Not Found |

## Authentication and Authorization

The application uses token-based authentication.

The tests perform the following operations where authentication is required:

1. Register a user.
2. Log in using the registered credentials.
3. Extract the access token from the login response.
4. Include the token in the `X-Authorization` request header.
5. Verify that access restrictions are enforced.

Separate user accounts are created to test resource ownership and unauthorized access.

## Running the Tests

### Prerequisites

- Node.js and npm
- The Music Library API backend running locally on port `3030`
- Required project dependencies installed

### Install dependencies

```bash
npm install
```

### Start the API

Start the backend using the provided Docker configuration or the project's documented startup command.

The API should be accessible at:

```text
http://localhost:3030
```

### Run the test suite

```bash
npm test
```

## Project Scope

The Music Library application was provided as the backend under test. My contribution to this project is the development of automated API tests covering the application's main functionality, authentication and authorization behaviour.

The tests focus on validating API responses and verifying that users can only modify or delete resources they are authorized to access.

## Future Improvements

- Expand negative testing scenarios.
- Validate response bodies and schemas.
- Add tests for invalid and missing request parameters.
- Improve test data management and cleanup.
- Integrate automated test execution into a CI/CD pipeline.
