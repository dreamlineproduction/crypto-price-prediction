'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { cryptoData } from '../data/cryptoData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = {
  bearish: {
    start: '#dc3545',
    end: '#ff6b6b'
  },
  neutral: {
    start: '#ffc107',
    end: '#ffda6a'
  },
  bullish: {
    start: '#28a745',
    end: '#34ce57'
  }
};

export default function CryptoChart() {
  const [selectedCategory, setSelectedCategory] = useState('top10');
  const [isExpanded, setIsExpanded] = useState(false);

  const chartData: ChartData<'bar'> = {
    labels: cryptoData[selectedCategory as keyof typeof cryptoData].labels,
    datasets: [
      {
        label: 'Bearish',
        data: cryptoData[selectedCategory as keyof typeof cryptoData].data.bearish,
        backgroundColor: `linear-gradient(180deg, ${chartColors.bearish.start}, ${chartColors.bearish.end})`,
        borderColor: chartColors.bearish.start,
        borderWidth: 1,
      },
      {
        label: 'Neutral',
        data: cryptoData[selectedCategory as keyof typeof cryptoData].data.neutral,
        backgroundColor: `linear-gradient(180deg, ${chartColors.neutral.start}, ${chartColors.neutral.end})`,
        borderColor: chartColors.neutral.start,
        borderWidth: 1,
      },
      {
        label: 'Bullish',
        data: cryptoData[selectedCategory as keyof typeof cryptoData].data.bullish,
        backgroundColor: `linear-gradient(180deg, ${chartColors.bullish.start}, ${chartColors.bullish.end})`,
        borderColor: chartColors.bullish.start,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'logarithmic' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (USD)',
          color: '#fff',
          font: {
            size: 14,
            weight: 600
          }
        },
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tokens',
          color: '#fff',
          font: {
            size: 13,
            weight: 600
          }
        },
        ticks: {
          color: '#fff',
          font: {
            size: 13,
            weight: 600
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (typeof context.raw === 'number') {
              label += context.raw.toLocaleString() + ' USD';
              if (context.dataset.label === "Bearish") label += " (Jan–Mar)";
              else if (context.dataset.label === "Neutral") label += " (Jun–Sep)";
              else if (context.dataset.label === "Bullish") label += " (Oct–Dec)";
            }
            return label;
          }
        },
        backgroundColor: 'rgba(33, 37, 41, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        boxPadding: 6,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        bodyFont: {
          size: 13
        },
        titleFont: {
          size: 14,
          weight: 600 as const
        }
      },
      legend: {
        position: 'top' as const,
        labels: {
          color: '#dee2e6',
          padding: 20,
          font: {
            size: 13
          },
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true
        }
      },
    },
  };

  return (
    <div 
      className={`container-fluid ${isExpanded ? 'mw-100 vh-100' : 'mw-75'} mx-auto p-4 bg-dark rounded-4 shadow-lg position-relative`}
      style={{
        maxWidth: isExpanded ? '95%' : '1200px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="bg-dark rounded-4 p-4 mb-4">
        <h2 
          className="mb-2" 
          style={{
            background: 'linear-gradient(45deg, #28a745, #20c997)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}
        >
          Crypto Price Targets for 2026
        </h2>
        <p className="text-light opacity-75">Predicted price ranges for various cryptocurrency categories</p>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn position-absolute top-0 end-0 m-4 d-flex align-items-center gap-2 shadow-lg"
        style={{
          background: 'linear-gradient(45deg, #28a745, #20c997)',
          border: 'none',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '1.5rem',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'scale(0.95)' : 'scale(1)'
        }}
      >
        {isExpanded ? (
          <>
            <i className="bi bi-fullscreen-exit me-2"></i>
            <span>Compact</span>
          </>
        ) : (
          <>
            <i className="bi bi-fullscreen me-2"></i>
            <span>Expand</span>
          </>
        )}
      </button>

      <div 
        className="d-flex justify-content-end gap-3 mb-4 p-3 bg-dark rounded-4 shadow-sm"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {['top10', 'difi', 'meme'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn px-4 py-2 shadow-sm ${
              selectedCategory === category
                ? 'text-white'
                : 'btn-outline-light text-light opacity-75'
            }`}
            style={{
              background: selectedCategory === category 
                ? 'linear-gradient(45deg, #28a745, #20c997)'
                : 'transparent',
              border: selectedCategory === category 
                ? 'none'
                : '1px solid rgba(255,255,255,0.3)',
              borderRadius: '1.5rem',
              transition: 'all 0.3s ease',
              minWidth: '120px'
            }}
          >
            {category === 'top10' ? 'Top 10' : category.toUpperCase()}
          </button>
        ))}
      </div>

      <div 
        className={`bg-dark rounded-4 p-4 ${isExpanded ? 'h-75' : 'h-50'}`}
        style={{ 
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: isExpanded ? '75vh' : '60vh'
        }}
      >
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-4 text-center text-light opacity-75">
        <small className="d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-info-circle"></i>
          Click on legends to toggle visibility • Hover over bars for detailed information
        </small>
      </div>
    </div>
  );
}
