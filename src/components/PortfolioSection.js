import React, { useState } from 'react';

const PortfolioSection = ({ portfolio, walletStats, onAddressChange, loading }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      console.log('Tracking portfolio for address:', address.trim());
      onAddressChange(address.trim());
    }
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return '0 ETH';
    return `${parseFloat(price).toFixed(3)} ETH`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const totalValue = portfolio.reduce((sum, item) => sum + (item.totalValue || 0), 0);

  return (
    <div className="portfolio-section">
      <div className="portfolio-header">
        <h2>💼 Check Your On-Chain Activity</h2>
        <p className="portfolio-subtitle">Check Your Wallet Stats</p>
        <p className="portfolio-description">Enter your wallet address to see your personal statistics and ranking</p>
      </div>
      
      <form onSubmit={handleSubmit} className="address-form">
        <input
          type="text"
          placeholder="Enter wallet address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
        />
        <button type="submit" className="track-button" disabled={loading}>
          {loading ? 'Loading...' : 'Check Stats'}
        </button>
      </form>

      {loading && <div className="portfolio-loading">Analyzing wallet activity...</div>}

      {walletStats && (
        <div className="wallet-stats-grid">
          <div className="stat-card-large">
            <div className="stat-icon">📊</div>
            <div className="stat-number">{formatNumber(walletStats.totalTransactions)}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">⛽</div>
            <div className="stat-number">{walletStats.gasSpent} ETH</div>
            <div className="stat-label">Gas Spent</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">💰</div>
            <div className="stat-number">{walletStats.totalVolume} ETH</div>
            <div className="stat-label">Total Volume</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">🎨</div>
            <div className="stat-number">{walletStats.nftBagValue} ETH</div>
            <div className="stat-label">NFT Bag Value</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">🔥</div>
            <div className="stat-number">{walletStats.longestStreak} days</div>
            <div className="stat-label">Longest Streak</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">#{formatNumber(walletStats.position)}</div>
            <div className="stat-label">Position</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">{formatNumber(walletStats.totalScore)}</div>
            <div className="stat-label">Total Score</div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{formatNumber(walletStats.totalUsers)}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
      )}

      {portfolio.length > 0 && (
        <div className="portfolio-content">
          <h3 className="portfolio-collections-title">🎨 Your NFT Collections</h3>
          <p className="portfolio-note">Showing Monad-related collections from your portfolio</p>
          
          <div className="portfolio-summary">
            <div className="summary-card">
              <h4>Total Portfolio Value</h4>
              <div className="total-value">{formatPrice(totalValue)}</div>
            </div>
            <div className="summary-card">
              <h4>Collections Owned</h4>
              <div className="total-collections">{portfolio.length}</div>
            </div>
            <div className="summary-card">
              <h4>Total NFTs</h4>
              <div className="total-nfts">
                {portfolio.reduce((sum, item) => sum + (item.ownedCount || 0), 0)}
              </div>
            </div>
          </div>

          <div className="portfolio-collections">
            {portfolio.map(item => (
              <div key={item.id} className="portfolio-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="portfolio-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ORlQ8L3RleHQ+PC9zdmc+';
                  }}
                />
                <div className="portfolio-details">
                  <h4>{item.name}</h4>
                  <div className="portfolio-stats">
                    <span>Owned: {item.ownedCount}</span>
                    <span>Floor: {formatPrice(item.floorPrice)}</span>
                    <span>Value: {formatPrice(item.totalValue)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !walletStats && !portfolio.length && address && (
        <div className="no-portfolio-data">
          <p>No data found for this wallet address.</p>
          <p>Try entering a different address or check if the address is correct.</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;