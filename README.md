# NurtureTech Project

## Overview
The NurtureTech project is a full-stack application designed to manage and track attendance, caregiver information, child enrollments, and financial records for childcare or educational settings. This application includes a backend server for API management and a frontend client for user interaction, featuring real-time updates, caching, and robust authentication mechanisms.

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

- **Real-time updates using Socket.IO**: Enables instant data synchronization between the server and clients.
- **RESTful APIs for various childcare management operations**: Facilitates CRUD operations for managing attendance, caregivers, children, enrollments, and finances.
- **Authentication system**: Secure user authentication and authorization using JSON Web Tokens (JWT).
- **Database integration with MySQL (Google Cloud SQL)**: Reliable and scalable relational database management.
- **Caching mechanism using Redis Cloud**: Enhances performance by caching frequently accessed data.
- **CORS support for frontend integration**: Allows secure cross-origin requests from the frontend application.
- **Internationalization (i18n)**: Supports **English**, **Hindi**, and **French**, providing a multilingual experience for a diverse user base.
- **Theme preferences**: Users can toggle between **light** and **dark** themes for better accessibility and user comfort.

---

## Technologies Used

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**
- **MySQL (Google Cloud SQL)**
- **Redis (Redis Cloud by Redis Labs)**
- **CORS**
- **JSON Web Token (JWT)**
- **i18n**

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**

### Infrastructure
- **Google Cloud SQL**: For a scalable and secure database.
- **Redis Cloud (Redis Labs)**: For high-performance caching.
- **Render**: For backend deployment.
- **Render**: For frontend deployment.

---

## Deployment
- **Live Website**: [https://nurturetech.onrender.com](https://nurturetech.onrender.com)

## Project Structure

### Backend
Manages server, APIs, database, real-time communication, and caching.
### Frontend
Provides the user interface for interaction with the backend.

## Installation
### Prerequisites
- **Node.js** and **npm** installed on your system.
- **MySQL** installed and running.
- **Redis** installed and running.

## Running the Project

1. **Start the MySQL Server**
2. **Start the Redis Server**
3. **Configure Environment Variables** (`.env` and `.env.production`).
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

The frontend application will be available at `http://localhost:5173`.

---

## File Structure

### Backend
- **config/**: Configuration files for database and environment setup.
- **controllers/**: Logic for each API endpoint.
- **middleware/**: Authentication, validation, and CORS handling.
- **models/**: Database schemas using ORM (e.g., Sequelize).
- **app.js**: Main backend entry point.

### Frontend
- **public/**: Static assets and translation files.
- **src/**: React components, context, and styling.
  - **components/**: Individual React components.
  - **context/**: Global state management with context providers.
  - **pages/**: Main page components.
  - **App.jsx**: Routing and context integration.
  - **index.jsx**: Entry point for React.

---

## Real-time Updates

Socket.IO is used to push updates in real-time for:
- Children data
- Caregivers data
- Finances
- Attendance
- Enrollments

This ensures consistent and up-to-date information across all clients.

---

## Caching

Redis Cloud optimizes performance by caching frequently accessed data such as:
- Attendance records
- Caregiver details
- Child profiles

This reduces MySQL load and enhances application scalability.

---

## Error Handling

Custom middleware catches and formats errors, returning standardized responses for better debugging and user experience.

---

### Backend `.env` (Development)
```env
# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nurturetech_db
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Backend `.env.production`
```env
# MySQL Configuration (Google Cloud SQL)
DB_HOST=your_google_cloud_sql_host
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=nurturetech_db

# JWT Configuration
JWT_SECRET=your_production_jwt_secret

# Redis Configuration (Redis Cloud)
REDIS_HOST=your_redis_cloud_host
REDIS_PORT=your_redis_cloud_port
REDIS_PASSWORD=your_redis_cloud_password
```
---

## Enhancements
- **Internationalization (i18n)**:
  - The application supports **English** (default), **Hindi**, and **French** for a localized user experience.
  - Language preferences are stored persistently using local storage, ensuring the user's choice is remembered across sessions.
  - Translation files are managed dynamically under the `public/locales` directory for efficient scalability.

- **Light/Dark Theme Preferences**:
  - Integrated a responsive **theme switcher** that allows users to choose between **light** and **dark** modes.
  - The selected theme is applied instantly across the application and saved in local storage for persistent preferences.
  - Built using Tailwind CSS for seamless theme transitions.

- Integrated **Google Cloud SQL** for scalable and secure database management.
- Migrated Redis caching to **Redis Cloud** for better performance and reliability.
- Deployed backend and frontend with **Render**.
- Enhanced real-time updates with **Socket.IO** using Redis Pub/Sub.
- Implemented robust CORS policies for secure frontend-backend communication.

---

## Upcoming Features

- **Detailed API Documentation**:  
  Comprehensive documentation for all endpoints, including request parameters, response formats, and example use cases. This will include:  
  - Authentication endpoints (e.g., login, register).  
  - CRUD operations for managing attendance, caregivers, children, enrollments, and finances.  
  - Real-time communication endpoints for Socket.IO events.  
  - Caching strategies with Redis for frequently accessed data.

---

## Future Plans

1. **Multi-tenancy Support**:  
   - Allow multiple childcare centers or schools to use the application with separate data and configurations.  
   - Custom branding for each tenant (e.g., logos, themes).  
   - Role-based access control for tenant-specific admin and staff users.

2. **Advanced Analytics Dashboards**:  
   - Visualize key metrics like attendance trends, caregiver performance, financial summaries, and enrollment statistics.  
   - Export data as PDF/CSV reports for offline use.  
   - Interactive charts and graphs powered by libraries like Chart.js or D3.js.  

3. **Localization Enhancements**:  
   - Expand language support beyond English, Hindi, and French to include other widely spoken languages.  
   - Implement **date, currency, and number formats** specific to user-selected locales.  

4. **AI-Powered Insights**:  
   - Leverage AI for predictive analytics, such as forecasting enrollment trends or identifying patterns in attendance.  
   - Generate actionable insights, like suggestions for optimizing staffing based on historical data.  

5. **Mobile App Integration**:  
   - Develop native or hybrid mobile apps to complement the web platform, offering on-the-go access for parents and caregivers.  
   - Push notifications for attendance alerts, upcoming payments, or new announcements.

6. **User Feedback and Support System**:  
   - Integrate a built-in feedback mechanism for users to submit bugs or feature requests directly within the app.  
   - Live chat or chatbot support to address user queries in real-time.  

7. **Offline Mode with Sync Capabilities**:  
   - Enable the application to work offline, with changes synced to the server when the user reconnects.  
   - Ideal for areas with intermittent internet connectivity.

8. **Customizable Workflows**:  
   - Allow administrators to configure workflows for attendance, payment reminders, or caregiver assignments to suit their organization’s needs.  

9. **Data Privacy and Compliance**:  
   - Ensure adherence to data protection laws like GDPR, CCPA, or local regulations.  
   - Regular audits to ensure the application meets security and privacy standards.  

10. **Integrations with Third-party Tools**:  
    - Integration with payment gateways for streamlined financial transactions.  
    - Connect with calendar services (e.g., Google Calendar) to manage caregiver schedules or events.  
    - API connectors for exporting data to third-party applications like accounting software.  

---

## Contributing

We welcome contributions! Fork the repository, make changes, and submit a Pull Request. Ensure your code follows project standards and is well-documented.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
