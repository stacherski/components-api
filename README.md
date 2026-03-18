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

## Project Structure

```
.
├── models/
├── routes/
├── controllers/
├── config/
├── middleware/
├── app.js
├── server.js
└── .env
```

## Installation

```bash
git clone https://github.com/stacherski/components-api.git
cd components-api
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

## Running the App

```bash
npm run dev
```

or

```bash
npm start
```

## API Endpoints

Base URL:

```
http://localhost:3000/api/components
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
  "category": "UI",
  "props": {
    "variant": "primary"
  }
}
```

### PUT /:id

Update component

### DELETE /:id

Delete component

## Data Model

```json
{
  "_id": "string",
  "name": "string",
  "category": "string",
  "props": "object",
  "createdAt": "date",
  "updatedAt": "date"
}
```

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
