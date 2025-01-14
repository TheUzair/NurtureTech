# NurtureTech

## Overview

The NurtureTech project is a full-stack application designed to manage and track attendance, caregiver information, child enrollments, and financial records for childcare or educational settings. This application includes a backend server for API management and a frontend client for user interaction, featuring real-time updates, caching, robust authentication mechanisms, and seamless integration with **Neon PostgreSQL** for database management.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [File Structure](#file-structure)
- [API Documentation](#api-documentation)
- [Real-time Updates](#real-time-updates)
- [Caching](#caching)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Enhancements](#enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Real-time updates using Socket.IO and PostgreSQL triggers**: Enables instant data synchronization between the server and clients by using triggers in the PostgreSQL database.
- **RESTful APIs for various childcare management operations**: Facilitates CRUD operations for managing attendance, caregivers, children, enrollments, and finances.
- **Authentication system**: Secure user authentication and authorization using JSON Web Tokens (JWT).
- **Database integration with Neon PostgreSQL**: A scalable, managed PostgreSQL database solution.
- **Caching mechanism using Redis Cloud**: Enhances performance by caching frequently accessed data.
- **CORS support for frontend integration**: Allows secure cross-origin requests from the frontend application.
- **Internationalization (i18n)**: Supports English, Hindi, and French for a localized user experience.
- **Theme preferences**: Users can toggle between light and dark themes for better accessibility and user comfort.

## Technologies Used
### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**
- **Neon PostgreSQL**: A scalable and secure PostgreSQL database solution.
- **Redis (Redis Cloud by Redis Labs)**
- **CORS**
- **JSON Web Token (JWT)**
- **i18n**

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**

### Infrastructure
- **Neon PostgreSQL**: For scalable and secure database management.
- **Redis Cloud (Redis Labs)**: For high-performance caching.
- **Render**: For backend and frontend deployment.

## Deployment
- **Live Website**: [https://nurturetech.onrender.com](https://nurturetech.onrender.com)

## Project Structure
### Backend
Manages server, APIs, database, real-time communication, and caching.

### Frontend
Provides the user interface for interaction with the backend.

## Installation
### Prerequisites
- Node.js and npm installed on your system.
- **Neon PostgreSQL** account and database setup.
- Redis installed and running.

### Running the Project
1. **Start the PostgreSQL Server**: Ensure PostgreSQL is running (either locally or using Neon PostgreSQL).
2. **Start the Redis Server**: Make sure Redis is running.
3. **Configure Environment Variables**: Use the appropriate `.env` or `.env.production` for local or production environments.
4. **Start the backend server**:
   ```bash
   cd backend_node
   npm start
   ```
5. **Start the frontend client**:
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend application will be available at [http://localhost:5173](http://localhost:5173).

## File Structure
### Backend
- `config/`: Configuration files for database and environment setup.
- `controllers/`: Logic for each API endpoint.
- `middleware/`: Authentication, validation, and CORS handling.
- `models/`: Database schemas using ORM (e.g., Sequelize).
- `app.js`: Main backend entry point.

### Frontend
- `public/`: Static assets and translation files.
- `src/`: React components, context, and styling.
  - `components/`: Individual React components.
  - `context/`: Global state management with context providers.
  - `pages/`: Main page components.
  - `App.jsx`: Routing and context integration.
  - `index.jsx`: Entry point for React.

## Real-time Updates
- **PostgreSQL triggers** are set up to listen for data changes in the database (e.g., for children, caregivers, attendance, finances, and enrollments).
- **Socket.IO** is used to push updates in real-time from the backend to the frontend.
- **Redis** is used in conjunction with PostgreSQL triggers and **Redis Pub/Sub** to cache frequently accessed data and notify clients of any changes.

This ensures consistent and up-to-date information across all clients without the need for manual refresh.

## Caching
**Redis Cloud** optimizes performance by caching frequently accessed data such as:
- Attendance records
- Caregiver details
- Child profiles

This reduces Neon PostgreSQL load and enhances application scalability.

## Error Handling
Custom middleware catches and formats errors, returning standardized responses for better debugging and user experience.

## Environment Variables
### Backend .env (Development)
```bash
# PostgreSQL Configuration
DB_HOST=localhost
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=NurtureTech
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Backend .env.production
```bash
# PostgreSQL Configuration (Neon PostgreSQL)
DB_HOST=your_neon_pg_host
DB_PORT=5432
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=NurtureTech

# JWT Configuration
JWT_SECRET=your_production_jwt_secret

# Redis Configuration (Redis Cloud)
REDIS_HOST=your_redis_cloud_host
REDIS_PORT=your_redis_cloud_port
REDIS_PASSWORD=your_redis_cloud_password
```

## Enhancements
### Internationalization (i18n)
- The application supports **English (default)**, **Hindi**, and **French** for a localized user experience.
- Language preferences are stored persistently using **local storage**, ensuring the user's choice is remembered across sessions.
- Translation files are managed dynamically under the `public/locales` directory for efficient scalability.

### Light/Dark Theme Preferences
- Integrated a responsive theme switcher that allows users to choose between **light** and **dark** modes.
- The selected theme is applied instantly across the application and saved in **local storage** for persistent preferences.
- Built using **Tailwind CSS** for seamless theme transitions.

### Database Migration
- **Neon PostgreSQL** has replaced **MySQL**, leveraging its scalability and reliability for the database solution.
- **Redis caching** is now migrated to **Redis Cloud** for better performance and reliability.

### Real-Time Updates with Redis Pub/Sub and PostgreSQL Triggers
- Real-time updates are driven by **PostgreSQL triggers** that notify Redis, which in turn pushes updates via **Socket.IO** to the clients.
- This setup ensures low latency and high performance for real-time data changes.

### Deployment
- Backend and frontend are deployed on **Render**.
- Integrated **Neon PostgreSQL** for PostgreSQL database hosting.
- **Redis Cloud** handles the caching mechanism.

## Upcoming Features
### Detailed API Documentation:
- Comprehensive documentation for all endpoints, including:
  - Authentication (login, register)
  - CRUD operations for attendance, caregivers, children, enrollments, and finances.
  - Real-time communication with Socket.IO.
  - Redis caching strategies with PostgreSQL triggers.

### Multi-Tenancy Support:
- Enable multiple childcare centers or schools to use the app with separate data and configurations.

### Advanced Analytics Dashboards:
- Visualize key metrics like attendance trends, caregiver performance, financial summaries, and enrollment statistics.

### Localization Enhancements:
- Expand language support and implement locale-specific formatting for dates, currencies, and numbers.

### AI-Powered Insights:
- Use AI to predict trends, such as enrollment forecasts and staffing needs based on historical data.

### Mobile App Integration:
- Develop mobile applications for on-the-go access and push notifications.

### User Feedback and Support System:
- Integrate real-time support features like chatbots and live feedback mechanisms.

## Contributing
We welcome contributions! Fork the repository, make changes, and submit a Pull Request. Ensure your code follows project standards and is well-documented.

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---