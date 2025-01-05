import React, { useEffect, useContext } from 'react';
import ChildrenOverview from './ChildrenOverview';
import CaregiversOverview from './CaregiversOverview';
import FinancialOverview from './FinancialOverview';
import AttendanceOverview from './AttendanceOverview';
import EnrollmentOverview from './EnrollmentOverview';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
  }, [theme, t]);

  return (
    <>
      <Navbar />
      <div className="threecharts flex justify-between flex-wrap gap-10 p-8 md:justify-around dark:bg-gray-900 bg-white">
        <ChildrenOverview />
        <CaregiversOverview />
        <FinancialOverview />
        <AttendanceOverview />
        <EnrollmentOverview />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;