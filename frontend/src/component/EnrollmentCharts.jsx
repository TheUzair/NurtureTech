import React, { useEffect, useContext } from 'react';
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

const EnrollmentCharts = ({ data = [] }) => {
  const { theme } = useContext(ThemeContext); 
  const { t } = useTranslation(); 

  useEffect(() => {
    const ctx = document.getElementById('enrollmentChart');

    if (!ctx) return; 

    // Destroy the existing chart if it exists
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    // Define theme-based colors
    const textColor = theme === 'dark' ? '#FFFFFF' : '#000000'; 
    const gridColor = theme === 'dark' ? '#FFFFFF' : '#000000'; 

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: getEnrollmentsByMonth(data).map(item => t(item.month)),
        datasets: [{
          label: false,
          data: getEnrollmentsByMonth(data).map(item => item.count),
          backgroundColor: 'DarkCyan',
          barThickness: 10,
          borderRadius: 10,
        }]
      },
      options: {
        responsive: true, 
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              autoSkip: true, 
              maxTicksLimit: window.innerWidth < 768 ? 6 : 12, 
              maxRotation: window.innerWidth < 768 ? 45 : 0, 
              minRotation: window.innerWidth < 768 ? 45 : 0, 
              padding: 10,
              color: textColor,
              font: {
                weight: 'bold',
              },
            }
          },
          y: {
            grid: {
              display: true,
              drawBorder: false,
              drawTicks: false,
              color: (context) => {
                return context.tick.value === 0 ? 'transparent' : gridColor; 
              }
            },
            ticks: {
              padding: 15,
              color: textColor, 
              stepSize: 10,
              font: {
                weight: 'bold',
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const month = tooltipItem.label; 
                const count = tooltipItem.raw;
                return `${t(month)}: ${count}`;
              }
            }
          },
          legend: {
            display: false,
            labels: {
              color: textColor,
              font: {
                weight: 'bold',
              }
            }
          }
        }
      }
    });

    // Attach the chart instance to the canvas for future reference
    ctx.chart = chart;

    // Cleanup on component unmount
    return () => {
      if (ctx && ctx.chart) {
        ctx.chart.destroy();
      }
    };
  }, [data, theme, t]); 

  const getEnrollmentsByMonth = (enrollmentData) => {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];

    const enrollmentCount = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    if (enrollmentData && enrollmentData.length > 0) {
      enrollmentData.forEach(enrollment => {
        const enrollmentDate = new Date(enrollment.date);
        const month = months[enrollmentDate.getMonth()];
        enrollmentCount[month] += 1;
      });
    }

    return months.map(month => ({ month, count: enrollmentCount[month] }));
  };

  return (
    <div className="w-full max-w-5xl h-full">
      <canvas id="enrollmentChart"></canvas>
    </div>
  );
};

export default EnrollmentCharts;
