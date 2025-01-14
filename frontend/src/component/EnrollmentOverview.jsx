import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EnrollmentCharts from './EnrollmentCharts';
import '../App.css';
import Divider from '@mui/material/Divider';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(`${API_URL}`);

const EnrollmentOverview = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [enrollmentSelectedYear, setEnrollmentSelectedYear] = useState('2024');
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Fetch enrollment data based on selected year
  const fetchEnrollmentData = async (year) => {
    try {
      const response = await axios.get(`${API_URL}/api/enrollments?year=${year}`);
      setEnrollmentData(response.data);
    } catch (error) {
      console.error("Error fetching enrollment data", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchEnrollmentData(enrollmentSelectedYear);

    // Listen for enrollment updates from the backend
    socket.on('enrollment_updates', async (update) => {
      if (update.year === enrollmentSelectedYear) {
        // Refresh enrollment data for the selected year when an update is received
        await fetchEnrollmentData(enrollmentSelectedYear);
      }
    });

    // Cleanup socket on component unmount
    return () => {
      socket.off('enrollment_updates');
    };
  }, [enrollmentSelectedYear]);

  const handleEnrollmentYearChange = (event) => {
    setEnrollmentSelectedYear(event.target.value);
  };


  return (
    <div className="EnrollmentOverview w-[62%] p-4 md:flex-basis-full full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="heading flex justify-between items-center mb-2">
        <div className='flex gap-2 items-center'>
          <div className='pl-1'>
            <img src="/enrollment1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
          </div>
          <div className="font-semibold text-black dark:text-white">{t('enrollment_overview')}</div>
        </div>

        <div className="relative inline-block p-2">
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-gray-500 dark:focus:border-gray-500"
            value={enrollmentSelectedYear}
            onChange={handleEnrollmentYearChange}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        {theme === 'dark' ? (
          <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
        ) : (
          <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
        )}
      </div>

      <div className='h-full'>
        <EnrollmentCharts data={enrollmentData} />
      </div>
    </div>
  );
};
export default EnrollmentOverview;