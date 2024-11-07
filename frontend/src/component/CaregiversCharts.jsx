import { useEffect, useContext } from 'react';
import Chart from 'chart.js/auto';
import { ThemeContext } from '../context/ThemeContext';  
import { useTranslation } from 'react-i18next';

let chartInstance; 

const CaregiversCharts = ({ data: caregiversData = [] }) => {
  const { theme } = useContext(ThemeContext);  
  const { t } = useTranslation();
  
  useEffect(() => {
    const canvas = document.getElementById('caregiversOverview');

    if (!canvas) return; 

    const ctx = canvas.getContext('2d');

    // Destroy existing chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    const activeCount = caregiversData.filter(caregiver => caregiver.status === 'active').length || 0;
    const registeredCount = caregiversData.filter(caregiver => caregiver.status === 'registered').length || 0;
    const inactiveCount = caregiversData.filter(caregiver => caregiver.status === 'inactive').length || 0;

    // Define theme-based colors
    const totalTextColor = theme === 'dark' ? '#4B5563' : '#6B7280';
    const textColor = theme === 'dark' ? '#FFFFFF' : '#000';
    const borderColor = theme === 'dark' ? '#1E293B' : '#FFFFFF'; 

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [registeredCount, activeCount, inactiveCount],
          backgroundColor: ['#4F46E5', '#0000FF', '#ADD8E6'], 
          borderColor: borderColor,
          borderWidth: 5,
          borderRadius: 10,
          hoverOffset: 4,
        }],
        labels: ['Registered', 'Active', 'Inactive'] 
      },
      options: {
        circumference: 180, 
        rotation: -90, 
        cutout: '70%', 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
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
      
          ctx.save();
      
          // Center the position for "Total" text and its count
          ctx.textAlign = 'center';
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = totalTextColor;
          ctx.fillText(t('total'), centerX, centerY + 30);  
          ctx.fillStyle = textColor;
          ctx.fillText(registeredCount + activeCount + inactiveCount, centerX, centerY + 60);  
          ctx.restore();
        }
      }]
    });

    // Destroy chart on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [caregiversData, theme, t]);  
  return (
    <canvas 
      id="caregiversOverview" 
      style={{ width: '300px', height: '300px' }}
    />
  );
};

export default CaregiversCharts;
