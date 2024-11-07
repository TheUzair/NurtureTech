# NurtureTech Project

## Overview
The NurtureTech project is a full-stack application designed to manage and track attendance, caregiver information, child enrollments, and financial records for childcare or educational settings. This application includes a backend server for API management and a frontend client for user interaction, featuring real-time updates, caching, and robust authentication mechanisms.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [File Structure](#file-structure)
- [API Documentation](#api-documentation)
- [Frontend Component Details](#frontend-component-details)
- [Real-time Updates](#real-time-updates)
- [Caching](#caching)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time updates using Socket.IO**: Enables instant data synchronization between the server and clients.
- **RESTful APIs for various childcare management operations**: Facilitates CRUD operations for managing attendance, caregivers, children, enrollments, and finances.
- **Authentication system**: Secure user authentication and authorization using JSON Web Tokens (JWT).
- **Database integration with MySQL**: Reliable and scalable relational database management.
- **Caching mechanism using Redis**: Enhances performance by caching frequently accessed data.
- **CORS support for frontend integration**: Allows secure cross-origin requests from the frontend application.

## Technologies Used

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**
- **MySQL**
- **Redis**
- **CORS**
- **JSON Web Token (JWT)**
- **i18n**

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**

## Project Structure

The project is divided into two main parts:
1. **Backend (Node.js)** - Manages the server, APIs, database, real-time communication, caching, and business logic.
2. **Frontend (React)** - Provides the user interface for interacting with the backend services.

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your system.
- **MySQL** installed and running.
- **Redis** installed and running.

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd nurturetech
   ```
3. **Install backend dependencies**:
   ```bash
   cd backend_node
   npm install
   ```
4. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Project

1. **Start the MySQL Server**:
   Ensure that your MySQL server is running and accessible.

2. **Start the Redis Server**:
   Ensure that your Redis server is running and accessible.

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend_node` directory with the necessary environment variables (see [Environment Variables](#environment-variables)).

4. **Start the backend server**:
   ```bash
   cd backend_node
   npm start
   ```
   The backend server will start on `http://localhost:3000`.

5. **Start the frontend client**:
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`.

## File Structure

### Backend

- **config/**: Contains configuration files, such as database and environment setup.
- **controllers/**: Houses controller files that define the logic for each API endpoint.
- **database/**: Manages the database connection.
- **middleware/**: Contains middleware files for authentication, validation, and CORS handling.
- **models/**: Defines the database schemas using ORM (e.g., Sequelize).
- **routes/**: Defines the API routes for different resources.
- **services/**: Contains service files that handle business logic separated from controllers.
- **sockets/**: Handles real-time communication using Socket.IO.
- **app.js**: Main entry point of the backend application.
- **package.json**: Lists the backend dependencies and scripts.

### Frontend

- **public/**: Holds static assets such as images and translation files for i18n.
- **src/**: Contains the main React components, context, and styling files.
  - **components/**: Contains individual React components for different views and functionalities.
  - **context/**: Manages global state with context providers.
  - **pages/**: Contains the main page components.
  - **App.jsx**: Sets up routing and integrates context providers for theming and authentication.
  - **index.jsx**: Entry point for React.

## API Documentation

### Authentication
- **POST /auth/login**: Log in a user.
- **POST /auth/register**: Register a new user.

### Children
- **GET /children**: Get all children.
- **POST /children**: Add a new child.
- **PUT /children/:id**: Update child information.
- **DELETE /children/:id**: Remove a child.

### Real-time Updates

The system uses **Socket.IO** to provide real-time updates for changes in:
- **Children** data
- **Caregivers** data
- **Finances** records
- **Attendance** tracking
- **Enrollments**

Each update emits events through WebSockets, allowing the frontend to display the latest information without requiring a page refresh. These real-time updates are essential for ensuring that data is consistent and up-to-date across all connected clients.

### Caching

Redis is used for caching frequently accessed data to improve performance. By storing data in Redis, the application reduces the load on the MySQL database, improving response times and scalability. Redis is especially beneficial for frequently read data like attendance records, caregiver details, and child profiles.

### Error Handling

Custom error handling middleware is implemented to manage and respond to errors effectively. This middleware catches errors in the request-response cycle, formats them, and sends a standardized error response to the client. This approach improves user experience by providing clear feedback on issues and helps with debugging.

## Environment Variables

The project relies on certain environment variables. Define these in a `.env` file in the `backend_node` directory.

### Backend `.env` Example:
```env
# MySQL Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=nurturetech

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

# Server Configuration
PORT=5000
```

*Ensure that sensitive information like `JWT_SECRET` and database credentials are kept secure and not committed to version control.*

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to fork the repository and create a Pull Request. Please ensure that your code follows the project’s coding standards and is well-documented.

## License
This project is licensed under the MIT License.