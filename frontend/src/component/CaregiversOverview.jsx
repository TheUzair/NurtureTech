import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CaregiversCharts from './CaregiversCharts';
import '../App.css';
import Divider from '@mui/material/Divider';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(`${API_URL}`);

const CaregiversOverview = () => {
  const [caregiversData, setCaregiversData] = useState([]);
  const [caregiversSelectedYear, setCaregiversSelectedYear] = useState('2024');
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Fetch caregiver data based on selected year
  const fetchCaregiversData = async (year) => {
    try {
      const response = await axios.get(`${API_URL}/api/caregivers?year=${year}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching caregiver data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCaregiversData(caregiversSelectedYear);
      setCaregiversData(data);
    };

    fetchData();

    // Listen for real-time updates from the server
    socket.on('caregiver_updates', async (update) => {
      const updatedData = await fetchCaregiversData(caregiversSelectedYear);
      setCaregiversData(updatedData);
    });

    return () => {
      socket.off('caregiver_updates');
    };
  }, [caregiversSelectedYear]);

  const handleCaregiversYearChange = (event) => {
    const year = event.target.value;
    setCaregiversSelectedYear(year);
  };

  return (
    <div className="caregiverOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
      <div className="heading flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          <div className='pl-1'>
            <img src="/caregivers1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
          </div>
          <div className="font-semibold">{t('caregiver_overview')}</div>
        </div>
        <div className="relative inline-block p-2">
          <select
            value={caregiversSelectedYear}
            onChange={handleCaregiversYearChange}
            className="block appearance-none w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:focus:bg-gray-700"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 dark:text-white">
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


      <div className="display-chart flex justify-center items-center p-5 h-64">
        <CaregiversCharts data={caregiversData} />
      </div>

      <div className="flex justify-center my-4">
        {theme === 'dark' ? (
          <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} style={{ width: '90%' }} />
        ) : (
          <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
        )}
      </div>

      <div className="caregiverstats flex justify-evenly m-4">
        <div className="registered flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-900 rounded-full mb-2"></div>
          <div className="flex items-center gap-2">
            <div className='text-gray-400 dark:text-gray-300 font-semibold'>{t('registered')}</div>
          </div>
          <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'registered').length}</div>
        </div>
        <div className="active flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mb-2"></div>
          <div className="flex items-center gap-2">
            <div className='text-gray-400 dark:text-gray-300 font-semibold'>{t('active')}</div>
          </div>
          <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'active').length}</div>
        </div>
        <div className="inactive flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-300 rounded-full mb-2"></div>
          <div className="flex items-center gap-2">
            <div className='text-gray-400 dark:text-gray-300 font-semibold'> {t('inactive')}</div>
          </div>
          <div className="font-bold dark:text-white">{caregiversData.filter(caregiver => caregiver.status === 'inactive').length}</div>
        </div>
      </div>
    </div>
  );
};

export default CaregiversOverview;