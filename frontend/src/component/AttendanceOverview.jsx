import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import AttendanceCharts from './AttendanceCharts';
import AttendanceModal from './AttendanceModal';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [predictAttendance, setPredictAttendance] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendance');
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance stats", error);
    }
  };

  const fetchPredictionData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendance/predict-attendance');
      setPredictAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance prediction", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
    fetchPredictionData();

    socket.on('attendance_updates', async (update) => {
      console.log(`Update received: ${JSON.stringify(update)}`);
      await fetchAttendanceData();
      await fetchPredictionData(); 
    });

    return () => {
      socket.off('attendance_updates');
    };
  }, []);

  const { change_percentage, current_week_attendance, last_week_attendance } = predictAttendance;

	const validChangePercentage = !isNaN(change_percentage) && typeof change_percentage === 'number'
		? change_percentage
		: 0;

	const isIncrease = validChangePercentage >= 0;
	const displayText = isIncrease
		? `${validChangePercentage}% ${t('more_than_last_week')}`
		: `${Math.abs(validChangePercentage)}% ${t('less_than_last_week')}`;

	const bgColorClass = isIncrease ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800';
	const textColorClass = isIncrease ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const totalAttendance = attendanceData.length;
	const onTimeCount = attendanceData.filter(attendee => attendee.status === 'on-time').length;
	const lateCount = attendanceData.filter(attendee => attendee.status === 'late attendance').length;
	const dayOffCount = attendanceData.filter(attendee => attendee.status === 'take day-off').length;
	const notPresentCount = attendanceData.filter(attendee => attendee.status === 'not-present').length;

	const mostFrequentStatus = [onTimeCount, lateCount, dayOffCount, notPresentCount]
		.sort((a, b) => b - a)[0];

	return (
		<>
			<div className="Attendance w-1/2 max-w-md maxWidth25rem md:flex-basis-1/2 full-width-centered bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
				<div className="heading flex justify-between items-center mt-2 mb-3">
					<div className='flex gap-2 items-center'>
						<div className='pl-1'>
							<img src="/attendance1.gif" alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
						</div>
						<div className="font-semibold text-black dark:text-white">{t('attendance_overview')}</div>
					</div>


					<div className="font-semibold bg-blue-100 dark:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={handleOpenModal}>
						<div className="text-black dark:text-gray-300">{t('view_stats')}</div>
					</div>
				</div>
				<div>
					{theme === 'dark' ? (
						<Divider sx={{ backgroundColor: 'white', opacity: 0.1 }} />
					) : (
						<Divider sx={{ backgroundColor: 'black', opacity: 0.1 }} />
					)}
				</div>
				<div className="display-chart-custom flex justify-center items-center p-5">
					<AttendanceCharts data={attendanceData} />
				</div>

				<div className="attendance-stats mt-5">
					<div className="flex justify-around mb-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
							<div className="font-bold text-black dark:text-white">{onTimeCount}</div>
							<div className="text-gray-600 dark:text-gray-400">{t('on_time')}</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
							<div className="font-bold text-black dark:text-white">{lateCount}</div>
							<div className="text-gray-600 dark:text-gray-400">{t('late_attendance')}</div>
						</div>
					</div>
					<div className="flex justify-around mb-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-orange-500 dark:bg-orange-300 rounded-full"></div>
							<div className="font-bold text-black dark:text-white">{dayOffCount}</div>
							<div className="text-gray-600 dark:text-gray-400">{t('take_day_off')}</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"></div>
							<div className="font-bold text-black dark:text-white">{notPresentCount}</div>
							<div className="text-gray-600 dark:text-gray-400">{t('not_present')}</div>
						</div>
					</div>
					<div className={`${bgColorClass} p-3 rounded-lg flex items-center gap-2 mt-5`}>
						<div className={`${textColorClass} font-bold`}>
							<img src={isIncrease ? "/increase.gif" : "/decrease.gif"} alt="" width={30} height={30} className={theme === 'dark' ? 'invert-image' : ''} />
						</div>
						<div className={textColorClass}>
							{displayText}
						</div>
					</div>
				</div>
			</div>


			<AttendanceModal isOpen={openModal} onClose={handleCloseModal}>
				<h2 className="text-xl font-bold mb-4 text-black dark:text-white">{t('detailed_attendance_stats')}</h2>
				<div>
					<h3 className="text-lg font-semibold text-black dark:text-white">{('summary')}:</h3>
					<ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
						<li>{t('total_attendance_records')}: {totalAttendance}</li>
						<li>{t('most_frequent_status')}: {mostFrequentStatus === onTimeCount ? 'On Time' : mostFrequentStatus === lateCount ? 'Late Attendance' : mostFrequentStatus === dayOffCount ? 'Take Day Off' : 'Not Present'}</li>
					</ul>
				</div>
			</AttendanceModal>

		</>
	);
};

export default AttendanceOverview;