# Components API

Lightweight REST API for managing reusable components.

## Overview

Components API is a simple backend service designed to store, retrieve, update and delete UI/component data. It provides a clean interface for working with structured component objects and can be used as a backend for design systems, CMS-like tools, or frontend applications.

The API follows standard REST conventions and is built for clarity, extensibility, and fast iteration.

## Features

- CRUD operations for components
- RESTful API structure
- JSON-based communication
- Modular architecture (routes, controllers, models)
- Easy integration with frontend applications
- Environment-based configuration

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose

## Installation

```bash
git clone https://github.com/stacherski/components-api.git
cd components-api
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=8080
DATABASE_URL=your_mongodb_connection_string
```

## Running the App

```bash
npm start
```

## API Endpoints

Base URL:

```
http://localhost:8080/components
```

### GET /

Get all components

### GET /:id

Get a single component

### POST /

Create component

Example:

```json
{
  "name": "Button",
  "description": "Button component description",
  "examples": [],
  "properties": [],
  "events": [],
  "files": []
}
```

### PUT /:id

Update component

### DELETE /:id

Delete component

## Error Handling

- 200 – Success
- 201 – Created
- 400 – Bad request
- 404 – Not found
- 500 – Server error

## Future Improvements

- Authentication (JWT)
- Validation (Joi / Zod)
- Pagination & filtering
- Swagger docs
- Rate limiting

## License

MIT

## Author

Andrzej Stacherski
