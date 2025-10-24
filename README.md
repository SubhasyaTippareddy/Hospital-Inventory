# Hospital Inventory Management System

A RESTful API system for managing hospital inventory and ventilator resources. Built with Node.js, Express.js, and MongoDB, featuring JWT-based authentication.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication system
- 🏥 **Hospital Management**: Track and manage hospital information
- 💨 **Ventilator Management**: CRUD operations for ventilator inventory
- 🔍 **Advanced Queries**: Filter ventilators by status and hospital
- 🛡️ **Protected Routes**: All endpoints secured with JWT middleware

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **jsonwebtoken** - Authentication tokens
- **Body-parser** - Request parsing middleware

## Prerequisites

- Node.js (v12 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Hospital-Inventory.git
cd Hospital-Inventory
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running on `localhost:27017`

4. Create a database named `hospitalManagement` with two collections:
   - `Hospitals`
   - `Ventilators`

## Usage

### Start the Server

```bash
npm start
```

The server will start on port 3000 and you'll see "Start" in the console.

### Authentication

First, obtain a JWT token by logging in:

**POST** `/login`

```json
{
  "username": "Subhasya",
  "password": "dummypass"
}
```

Response:
```json
{
  "success": true,
  "message": "Authentication successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### API Endpoints

All endpoints (except `/login`) require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### Hospitals

**GET** `/hospitals`
- Fetch all hospitals or filter by hospital name
- Query parameter: `hname` (optional)

Example:
```bash
curl http://localhost:3000/hospitals?hname=General%20Hospital
```

#### Ventilators

**GET** `/ventilators`
- Fetch ventilator details
- Query filters: `status`, `hname` (via request body)

**POST** `/ventilators`
- Add a new ventilator
- Body: `vid`, `hid`, `status`, `hname`

**PATCH** `/ventilators`
- Update ventilator status
- Body: `vid`, `status`

**DELETE** `/ventilators`
- Delete a ventilator
- Body: `vid`

## Project Structure

```
Hospital-Inventory/
├── config.js          # JWT secret configuration
├── index.js           # Main application file (Express routes)
├── middleware.js      # JWT authentication middleware
├── server.js          # Server setup and login handlers
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Configuration

The JWT secret is configured in `config.js`. **Important**: Change the secret in production environments!

## Database Schema

### Hospitals Collection
```javascript
{
  hname: String,
  // Add other hospital fields as needed
}
```

### Ventilators Collection
```javascript
{
  hid: String,      // Hospital ID
  vid: String,      // Ventilator ID
  status: String,   // Status (e.g., "available", "in-use", "maintenance")
  hname: String     // Hospital name
}
```

## Security Notes

- This project uses JWT for authentication
- Default credentials are hardcoded (should be replaced with database lookups in production)
- Change the JWT secret in `config.js` before deploying

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Subhasya

