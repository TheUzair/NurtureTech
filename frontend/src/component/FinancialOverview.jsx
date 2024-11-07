import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import '../App.css';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const FinancialOverview = () => {
  const [financialData, setFinancialData] = useState([]);
  const [financialSelectedYear, setFinancialSelectedYear] = useState('2024');
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Fetch financial data based on selected year
  const fetchFinancialData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/finances?year=${year}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching financial data:", error);
      return {};
    }
  };

  // Fetch data on year change and set up real-time updates with Socket.IO
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFinancialData(financialSelectedYear);
      setFinancialData(data);
    };

    fetchData();

    socket.on('financial_updates', async (update) => {
      // Fetch updated data and set it when an update is received
      const updatedData = await fetchFinancialData(financialSelectedYear);
      setFinancialData(updatedData);
    });

    return () => {
      socket.off('financial_updates');
    };
  }, [financialSelectedYear]);

  // Handle year change
  const handleFinancialYearChange = (event) => {
    const year = event.target.value;
    setFinancialSelectedYear(year);
  };

  return (
    <div className="financialOverview h-full p-4 flex-grow max-w-md xl:w-1/3 md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="heading flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          <div className='pl-1'>
            <img src="/financial1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
          </div>
          <div className="font-semibold dark:text-gray-100">{t('financial_overview')}</div>
        </div>
        <div className="relative inline-block p-2">
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={financialSelectedYear}
            onChange={handleFinancialYearChange}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
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



      <div className="outcome grid grid-cols-2 gap-4 p-3">
        {/* Total Revenue */}
        <div className="total-revenue p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
          <div className="flex mb-4 ml-1">
            <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="font-bold text-sm dark:text-gray-300">{t('total_revenue')}</div>
            </div>
          </div>
          <div className="money font-bold text-black dark:text-white text-xl ml-2">${financialData.totalRevenue}</div>
          <div className="period text-gray-500 dark:text-gray-400 ml-2">{t('last_30_days')}</div>
        </div>


        {/* Profit Margin */}
        <div className="profit-margin p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
          <div className="flex mb-4 ml-1">
            <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="font-bold text-sm dark:text-gray-300">{t('total_profit')}</div>
            </div>
          </div>
          <div className="money font-bold text-black dark:text-white text-xl ml-2">{financialData.profitMargin}%</div>
          <div className="period text-gray-500 dark:text-gray-400 ml-2">{t('last_30_days')}</div>
        </div>

        {/* Total Income */}
        <div className="total-income p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
          <div className="flex mb-4 ml-1">
            <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="font-bold text-sm dark:text-gray-300">{t('total_income')}</div>
            </div>
          </div>
          <div className="money font-bold text-black dark:text-white text-xl ml-2">${financialData.netIncome}</div>
          <div className="period text-gray-500 dark:text-gray-400 ml-2">{t('last_30_days')}</div>
        </div>

        {/* Total Expenses */}
        <div className="total-expenses p-3 rounded-lg shadow-xl bg-yellow-50 dark:bg-gray-700">
          <div className="flex mb-4 ml-1">
            <div className="bg-blue-50 dark:bg-gray-600 rounded-lg flex items-center gap-2 p-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="font-bold text-sm dark:text-gray-300">{t('total_expenses')}</div>
            </div>
          </div>
          <div className="money font-bold text-black dark:text-white text-xl ml-2">
            ${financialData?.totalExpenses?.toLocaleString() || 0}
          </div>
          <div className="period text-gray-500 dark:text-gray-400 ml-2">{t('last_30_days')}</div>
        </div>
      </div>

      <div className="flex items-center bg-blue-50 dark:bg-gray-700 rounded-lg m-3 p-2">
        <div>
          <img src="/info1.gif" alt="" width={24} height={24} className={theme === 'dark' ? 'invert-image' : ''} />
        </div>
        <div className="ml-2 text-cyan-700 dark:text-cyan-300">{t('check_daily')}</div>
      </div>
    </div>
  );
};

export default FinancialOverview;