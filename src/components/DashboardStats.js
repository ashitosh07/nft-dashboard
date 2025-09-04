import React from 'react';

const DashboardStats = ({ stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return '0 MON';
    return `${parseFloat(price).toLocaleString()} MON`;
  };

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-value">{stats.totalCollections}</div>
        <div className="stat-label">Collections</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{formatNumber(stats.totalVolume)} MON</div>
        <div className="stat-label">Total Volume</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{formatPrice(stats.avgFloorPrice)}</div>
        <div className="stat-label">Avg Floor Price</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{formatNumber(stats.totalOwners)}</div>
        <div className="stat-label">Total Owners</div>
      </div>
    </div>
  );
};

export default DashboardStats;