import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token'); 
  const [redirectCountdown, setRedirectCountdown] = useState(3); 

  useEffect(() => {
    if (!token) {
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear interval after 3 seconds and redirect
      const timeout = setTimeout(() => {
        clearInterval(countdownInterval);
      }, 3000);

      return () => {
        clearTimeout(timeout);
        clearInterval(countdownInterval);
      };
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold mb-4 dark:text-white">
          {t('not_logged_in_message', { seconds: redirectCountdown })} 
        </p>
        {redirectCountdown <= 0 && <Navigate to="/" />} 
      </div>
    );
  }

  return children; 
};

export default ProtectedRoute;
