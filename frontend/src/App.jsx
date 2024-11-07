import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login'
import Register from './component/Register'
import ProtectedRoute from './component/ProtectedRoute';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import './index.css';
import Homepage from './component/Homepage';
import { ThemeProvider } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Router>
          <Navbar />
          <div className="dark:bg-slate-900 bg-green-50 bg-[linear-gradient(to_right, #8080800a_1px, transparent_1px), 
        linear-gradient(to_bottom, #8080800a_1px, transparent_1px)] bg-[size:14px_24px] min-h-[86.9vh]">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
