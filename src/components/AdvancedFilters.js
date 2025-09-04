import React from 'react';

const AdvancedFilters = ({ 
  filters, 
  onFilterChange, 
  onSortChange, 
  onViewModeChange,
  viewMode 
}) => {
  return (
    <div className="advanced-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label>Price Range (ETH)</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              step="0.01"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="price-input"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              step="0.01"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="price-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Volume Range (ETH)</label>
          <div className="volume-inputs">
            <input
              type="number"
              placeholder="Min Volume"
              value={filters.minVolume || ''}
              onChange={(e) => onFilterChange('minVolume', e.target.value)}
              className="volume-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Collection Size</label>
          <select
            value={filters.sizeFilter || ''}
            onChange={(e) => onFilterChange('sizeFilter', e.target.value)}
            className="size-select"
          >
            <option value="">Any Size</option>
            <option value="small">Small (&lt; 1K)</option>
            <option value="medium">Medium (1K - 10K)</option>
            <option value="large">Large (&gt; 10K)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Verified Only</label>
          <input
            type="checkbox"
            checked={filters.verifiedOnly || false}
            onChange={(e) => onFilterChange('verifiedOnly', e.target.checked)}
            className="verified-checkbox"
          />
        </div>
      </div>

      <div className="sort-view-controls">
        <div className="sort-group">
          <label>Sort By</label>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="floorPrice">Floor Price</option>
            <option value="volume24h">24h Volume</option>
            <option value="change24h">24h Change</option>
            <option value="owners">Owners</option>
            <option value="marketCap">Market Cap</option>
            <option value="sales24h">24h Sales</option>
          </select>
        </div>

        <div className="view-controls">
          <label>View</label>
          <div className="view-buttons">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => onViewModeChange('grid')}
            >
              Grid
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
            <button
              className={viewMode === 'compact' ? 'active' : ''}
              onClick={() => onViewModeChange('compact')}
            >
              Compact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;