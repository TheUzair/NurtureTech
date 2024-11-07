import React, { useEffect, useContext } from 'react';
import Chart from 'chart.js/auto';
import { ThemeContext } from '../context/ThemeContext';
import '../App.css';
import { useTranslation } from 'react-i18next';


const AttendanceCharts = ({ data = [] }) => {
  const { theme } = useContext(ThemeContext);  
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = document.getElementById('cdDriveChart');

    if (!ctx) return; 

    if (!Array.isArray(data)) return;

    // Extract data values from props
    const onTimeCount = data.filter(attendee => attendee.status === 'on-time').length;
    const lateCount = data.filter(attendee => attendee.status === 'late attendance').length;
    const dayOffCount = data.filter(attendee => attendee.status === 'take day-off').length;
    const notPresentCount = data.filter(attendee => attendee.status === 'not-present').length;

    // Destroy existing chart instance before creating a new one
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    // Theme-based colors
    const borderColor = theme === 'dark' ? '#1E293B' : '#FFFFFF';
    const availableCount = theme === 'dark' ? '#FFFFFF' : '#000';
    const totalCountColor = theme === 'dark' ? '#4B5563' : '#6B7280';

    // A new chart
    window.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [onTimeCount, lateCount, dayOffCount, notPresentCount],
          backgroundColor: ['#4B0082', '#FF0000', '#FFA500', '#67E8F9'], 
          borderWidth: 5,
          borderColor: borderColor, 
          hoverOffset: 4,
          borderRadius: 10,
        }],
        labels: ['On-time', 'Late-attendance', ' Day-off', 'Not-present'] 
      },
      options: {
        cutout: '70%', 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true, 
          }
        }
      },
      plugins: [{
        id: 'customCenterText',
        beforeDraw: function(chart) {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const centerX = width / 2;
          const centerY = height / 2;

          // Center text for the total attendance and capacity
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = availableCount; 

          ctx.fillText(`${onTimeCount + lateCount + dayOffCount + notPresentCount}`, centerX, centerY - 10);  
          ctx.font = 'bold 18px Arial';
          ctx.fillStyle = totalCountColor;  
          ctx.fillText('/2000', centerX, centerY + 20);  
          ctx.restore();
        }
      }]
    });

    // Destroy chart on unmount
    return () => {
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
    };
  }, [data, theme, t]);  

  return (
    <div style={{ width: '100%', maxWidth: '1000px', height: '100%' }}>
      <canvas id="cdDriveChart" />
    </div>
  );
};

export default AttendanceCharts;
