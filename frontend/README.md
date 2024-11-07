# Frontend Setup for AspireIT

This project is the frontend of the AspireIT application. It is built using **React.js** with **Vite** for a fast development environment and **Tailwind CSS** for styling. The project also includes various components for handling different aspects of the app, such as charts for attendance, enrollments, and more.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: You can download it from [here](https://nodejs.org/).
- **npm** (comes with Node.js) or **Yarn**: If you prefer using Yarn, install it from [here](https://yarnpkg.com/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/TheUzair/Aspire-IT.git
```

2. Navigate into the project directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

or, if you're using **Yarn**:

```bash
yarn install
```

## Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

or for Yarn users:

```bash
yarn dev
```

This will start a local development server (usually running at `http://localhost:5173/` by default).
Here's an updated version of the `README.md` section with detailed descriptions of each file based on your provided structure:

---

## Folder Structure

The important files and directories in the project are:

- **src/**: Contains all the source code.
  - **component/**: This folder contains all the React components used in the application, such as:
    - `AttendanceCharts.jsx`: Handles attendance-related charts.
    - `AttendanceModal.jsx`: Modal for attendance-related actions or data.
    - `AttendanceOverview.jsx`: Displays an overview of attendance statistics.
    - `CaregiversCharts.jsx`: Displays caregiver-related statistics.
    - `CaregiversOverview.jsx`: Provides an overview of caregivers' data.
    - `ChildrenCharts.jsx`: Shows data related to children's statuses.
    - `ChildrenOverview.jsx`: Provides an overview of children's information.
    - `Dashboard.jsx`: The main dashboard component summarizing app metrics.
    - `EnrollmentCharts.jsx`: Displays enrollment data through charts.
    - `EnrollmentOverview.jsx`: Shows a detailed view of enrollment statistics.
    - `FinancialOverview.jsx`: Displays financial data overview.
    - `Footer.jsx`: The footer component for the site.
    - `Homepage.jsx`: The landing or homepage of the application.
    - `language-selector.jsx`: Provides a dropdown to switch between different languages for internationalization.
    - `Login.jsx`: Handles user login functionality.
    - `Navbar.jsx`: The navigation bar component for easy site navigation.
    - `Prediction.jsx`: Component for displaying predictions using machine learning models.
    - `ProtectedRoute.jsx`: Handles protected routes, ensuring only authenticated users access certain pages.
    - `Register.jsx`: Handles user registration functionality.
  - **context/**: Contains global context providers like `DarkModeContext.jsx` for handling app-wide settings like dark mode.
  - **App.css**: General styles for the entire app.
  - **App.jsx**: The root component that ties together all other components.
  - **i18n.js**: Configuration file for internationalization (i18n), handling multiple languages.
  - **index.css**: Contains global CSS styles for the app.
  - **main.jsx**: The main entry point for the React application.
- **index.html**: The main entry HTML file for the application.
- **tailwind.config.js**: Configuration file for Tailwind CSS, which handles utility-first styling.
- **vite.config.js**: Configuration for Vite.js, which powers the development server and build process.
- **package.json**: Contains project metadata, dependencies, and npm scripts.
- **README.md**: Project documentation (this file).

## Styling

This project uses **Tailwind CSS** for utility-first styling. If you want to add custom styles, modify the **App.css** or use Tailwind classes in your JSX files.

## Linting

The project uses **ESLint** for code linting. To run the linter:

```bash
npm run lint
```

## Build for Production

To build the project for production, run:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

This will output the production-ready files into the `dist` directory.

## Contributing

Feel free to open an issue or submit a pull request for any feature requests or bugs you encounter.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```

This `README.md` file covers the basic setup, instructions, and folder structure for the frontend of the project. 
