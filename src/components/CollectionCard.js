import React from 'react';

const CollectionCard = ({ collection, viewMode = 'grid' }) => {
  const formatPrice = (price) => {
    if (!price || price === 0) return 'N/A';
    return `${parseFloat(price).toLocaleString()} MON`;
  };
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className={`collection-card ${viewMode}`}>
      <img 
        src={collection.image} 
        alt={collection.name}
        className="collection-image"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzYzNjZmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TkZUPC90ZXh0Pjwvc3ZnPg==';
        }}
      />
      <div className="collection-info">
        <div className="collection-header">
          <div>
            <h3 className="collection-name">{collection.name}</h3>
            <p className="collection-symbol">{collection.symbol}</p>
          </div>
          <div className={`change-indicator ${collection.change24h >= 0 ? 'change-positive' : 'change-negative'}`}>
            {collection.change24h >= 0 ? '+' : ''}{collection.change24h}%
          </div>
        </div>
        
        <p className="collection-description">{collection.description}</p>
        
        <div className="collection-stats">
          <div className="stat-item">
            <div className="stat-item-value">{formatPrice(collection.floorPrice)}</div>
            <div className="stat-item-label">Floor Price</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">{formatPrice(collection.volume24h)}</div>
            <div className="stat-item-label">24h Volume</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">{formatNumber(collection.owners)}</div>
            <div className="stat-item-label">Owners</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">{formatNumber(collection.totalSupply)}</div>
            <div className="stat-item-label">Total Supply</div>
          </div>
        </div>
        
        <div className="collection-actions">
          {collection.verified && (
            <span className="verified-badge">✓ Verified</span>
          )}
          {collection.contractAddress && (
            <a 
              href={`https://explorer.monad.xyz/address/${collection.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              View on Monad Explorer
            </a>
          )}
          {collection.network && (
            <span className="network-badge">
              {collection.network === 'testnet' ? '🟡 Testnet' : '🟢 Mainnet'}
            </span>
          )}
        </div>
        
        <div className="additional-stats">
          <div className="stat-item">
            <div className="stat-item-value">{formatNumber(collection.sales24h)}</div>
            <div className="stat-item-label">24h Sales</div>
          </div>
          <div className="stat-item">
            <div className="stat-item-value">{formatPrice(collection.marketCap)}</div>
            <div className="stat-item-label">Market Cap</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;