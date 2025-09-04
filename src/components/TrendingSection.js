import React from 'react';
import Pagination from './Pagination';

const TrendingSection = ({ collections, loading, onPageChange, currentPage, hasNextPage, hasPrevPage }) => {
  const formatPrice = (price) => {
    if (!price || price === 0) return 'N/A';
    return `${parseFloat(price).toLocaleString()} MON`;
  };

  const formatChange = (change) => {
    if (!change) return '0%';
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="trending-section">
        <h2>🔥 Trending Collections</h2>
        <div className="trending-loading">Loading trending collections...</div>
      </div>
    );
  }

  return (
    <div className="trending-section">
      <h2>🔥 Trending Monad Collections (24h)</h2>
      {loading ? (
        <div className="trending-loading">Loading trending collections...</div>
      ) : collections.length > 0 ? (
        <>
          <div className="trending-grid">
            {collections.map((collection, index) => (
              <div key={collection.id} className="trending-card">
                <div className="trending-rank">#{((currentPage - 1) * 20) + index + 1}</div>
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="trending-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ORlQ8L3RleHQ+PC9zdmc+';
                  }}
                />
                <div className="trending-info">
                  <h4>{collection.name}</h4>
                  <div className="trending-stats">
                    <span className="trending-floor">Floor: {formatPrice(collection.floorPrice)}</span>
                    <span className={`trending-change ${collection.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {formatChange(collection.change24h)}
                    </span>
                  </div>
                  <div className="trending-volume">
                    Vol: {formatPrice(collection.volume24h)}
                  </div>
                  <div className="trending-sales">
                    Sales: {collection.sales24h || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={currentPage + (hasNextPage ? 10 : 0)}
            onPageChange={onPageChange}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            loading={loading}
          />
        </>
      ) : (
        <div className="no-results">No trending collections found.</div>
      )}
    </div>
  );
};

export default TrendingSection;