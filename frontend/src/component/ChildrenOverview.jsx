import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChildrenCharts from './ChildrenCharts';
import Divider from '@mui/material/Divider';
import '../App.css';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(`${API_URL}`);

const ChildrenOverview = () => {
  const [childrenData, setChildrenData] = useState([]);
  const [childrenSelectedYear, setChildrenSelectedYear] = useState('2024');
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Fetch children data based on selected year
  const fetchChildrenData = async (year) => {
    try {
      const response = await axios.get(`${API_URL}/api/children?year=${year}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching children data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChildrenData(childrenSelectedYear);
      setChildrenData(data);
    };
  
    fetchData();
  
    socket.on('child_updates', async (update) => {
      const updatedData = await fetchChildrenData(childrenSelectedYear);
      setChildrenData(updatedData);
    });
  
    return () => {
      socket.off('child_updates');
    };
  }, [childrenSelectedYear, socket]);

  const handleChildrenYearChange = (event) => {
    const year = event.target.value;
    setChildrenSelectedYear(year);
  };


  return (
    <div className="childrenOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 sm-flex-basis-full full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="heading flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="pl-1">
            <img src="children2.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
          </div>
          <div className="font-semibold dark:text-white">{t('children_overview')}</div>
        </div>
        <div className="relative inline-block p-2">
          {/* Dropdown for year selection */}
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={childrenSelectedYear}
            onChange={handleChildrenYearChange}
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


      <div className="display-chart flex justify-center items-center p-5 h-64">
        <ChildrenCharts data={childrenData} />
      </div>

      <div className="flex justify-center my-4">
        {theme === 'dark' ? (
          <Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} style={{ width: '90%' }} />
        ) : (
          <Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} style={{ width: '90%' }} />
        )}
      </div>

      <div className="stats flex justify-evenly m-4">
        <div className="registered flex flex-col items-center">
          <div className="w-2 h-2 bg-fuchsia-600 rounded-full mb-2"></div>
          <div className="text-gray-400 dark:text-gray-300 font-semibold"> {t('registered')}</div>
          <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'registered').length}</div>
        </div>
        <div className="active flex flex-col items-center">
          <div className="w-2 h-2 bg-orange-600 rounded-full mb-2"></div>
          <div className="text-gray-400 dark:text-gray-300 font-semibold">{t('active')}</div>
          <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'active').length}</div>
        </div>
        <div className="inactive flex flex-col items-center">
          <div className="w-2 h-2 bg-pink-600 rounded-full mb-2"></div>
          <div className="text-gray-400 dark:text-gray-300 font-semibold">{t('inactive')}</div>
          <div className="font-bold dark:text-white">{childrenData.filter(child => child.status === 'inactive').length}</div>
        </div>
      </div>
    </div>

  );
};

export default ChildrenOverview;