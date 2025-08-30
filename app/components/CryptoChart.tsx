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
  const [showModal, setShowModal] = useState(false);
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    bearish: '',
    neutral: '',
    bullish: ''
  });

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
            size: window?.innerWidth < 768 ? 12 : 14,
            weight: 600
          }
        },
        ticks: {
          color: '#fff',
          font: {
            size: window?.innerWidth < 768 ? 11 : 13
          },
          maxRotation: 45,
          minRotation: 45
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
            size: window?.innerWidth < 768 ? 12 : 13,
            weight: 600
          },
          padding: { top: 10 }
        },
        ticks: {
          color: '#fff',
          font: {
            size: window?.innerWidth < 768 ? 11 : 13,
            weight: 600
          },
          maxRotation: 45,
          minRotation: 45
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
      className={`container-fluid mx-auto p-3 p-sm-4 bg-dark rounded-4 shadow-lg position-relative ${
        isExpanded ? 'mw-100 vh-100' : 'w-100'
      }`}
      style={{
        maxWidth: isExpanded ? '95%' : '1200px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}
    >
      <div className="bg-dark rounded-4 p-3 p-sm-4 mb-3 mb-sm-4">
        <h2 
          className="mb-2 fs-3 fs-sm-2" 
          style={{
            background: 'linear-gradient(45deg, #28a745, #20c997)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}
        >
          Crypto Price Targets for 2026
        </h2>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="text-light opacity-75 small mb-0">Predicted price ranges for various cryptocurrency categories</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm shadow-sm d-flex align-items-center gap-2"
            style={{
              background: 'linear-gradient(45deg, #28a745, #20c997)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '1.5rem',
              fontSize: '0.875rem'
            }}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Token</span>
          </button>
        </div>
      </div>

      {/* Add Token Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title">Add New Token</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Token Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    placeholder="e.g., Bitcoin"
                    value={newToken.name}
                    onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Token Symbol</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    placeholder="e.g., BTC"
                    value={newToken.symbol}
                    onChange={(e) => setNewToken({...newToken, symbol: e.target.value})}
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div className="row g-3">
                  <div className="col-12 col-sm-4">
                    <label className="form-label">Bearish Target (USD)</label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light"
                      placeholder="0.00"
                      value={newToken.bearish}
                      onChange={(e) => setNewToken({...newToken, bearish: e.target.value})}
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="form-label">Neutral Target (USD)</label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light"
                      placeholder="0.00"
                      value={newToken.neutral}
                      onChange={(e) => setNewToken({...newToken, neutral: e.target.value})}
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="form-label">Bullish Target (USD)</label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light"
                      placeholder="0.00"
                      value={newToken.bullish}
                      onChange={(e) => setNewToken({...newToken, bullish: e.target.value})}
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn text-white"
                  style={{
                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                    border: 'none'
                  }}
                  onClick={() => {
                    // Add token logic here
                    setShowModal(false);
                  }}
                >
                  Add Token
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn d-none d-sm-flex position-absolute top-0 end-0 m-3 m-sm-4 align-items-center gap-2 shadow-lg"
        style={{
          color: 'white',
          borderRadius: '1.5rem',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'scale(0.95)' : 'scale(1)',
          zIndex: 10
        }}
      >
        {isExpanded ? (
          <>
            <i className="bi bi-fullscreen-exit"></i>
           
          </>
        ) : (
          <>
            <i className="bi bi-fullscreen"></i>
            
          </>
        )}
      </button>

      <div 
        className="d-flex flex-wrap justify-content-center justify-content-sm-end gap-2 gap-sm-3 mb-3 mb-sm-4 p-2 p-sm-3 bg-dark rounded-4 shadow-sm"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {['top10', 'difi', 'meme'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn px-3 px-sm-4 py-2 shadow-sm ${
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
              minWidth: '100px',
              fontSize: '0.9rem'
            }}
          >
            {category === 'top10' ? 'Top 10' : category.toUpperCase()}
          </button>
        ))}
      </div>

      <div 
        className={`bg-dark rounded-4 p-2 p-sm-4 ${isExpanded ? 'h-75' : ''}`}
        style={{ 
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: isExpanded ? '75vh' : '50vh',
          height: !isExpanded ? '50vh' : undefined
        }}
      >
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-3 mt-sm-4 text-center text-light opacity-75">
        <small className="d-flex flex-wrap align-items-center justify-content-center gap-2 px-2">
          <i className="bi bi-info-circle"></i>
          <span className="d-none d-sm-inline">Click on legends to toggle visibility •</span>
          Hover over bars for details
        </small>
      </div>
    </div>
  );
}
