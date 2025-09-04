import React, { useState, useMemo } from 'react';
import CollectionCard from './components/CollectionCard';
import DashboardStats from './components/DashboardStats';
import LoadingSpinner from './components/LoadingSpinner';
import TrendingSection from './components/TrendingSection';
import PortfolioSection from './components/PortfolioSection';
import AdvancedFilters from './components/AdvancedFilters';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import NetworkSelector from './components/NetworkSelector';
import { useNFTData } from './hooks/useNFTData';
import './styles/App.css';

function App() {
  const [sortBy, setSortBy] = useState('allTimeVolume');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('collections');
  const [filters, setFilters] = useState({});
  
  const { 
    collections, 
    trendingCollections, 
    userPortfolio,
    walletStats,
    loading, 
    searchLoading,
    error, 
    monPrice, 
    networkStats,
    selectedNetwork,
    lastUpdated, 
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    searchQuery,
    isSearchMode,
    refreshData,
    setUserAddress,
    setSelectedNetwork,
    handlePageChange,
    handleSearch,
    clearSearch,
    fetchTrendingCollections
  } = useNFTData();

  const dashboardStats = useMemo(() => {
    if (collections.length === 0) return { totalCollections: 0, totalVolume: 0, avgFloorPrice: 0, totalOwners: 0 };
    
    const validCollections = collections.filter(col => col.floorPrice > 0);
    
    return {
      totalCollections: collections.length,
      totalVolume: collections.reduce((sum, col) => sum + (col.volume24h || 0), 0),
      avgFloorPrice: validCollections.length > 0 
        ? validCollections.reduce((sum, col) => sum + (col.floorPrice || 0), 0) / validCollections.length 
        : 0,
      totalOwners: collections.reduce((sum, col) => sum + (col.owners || 0), 0)
    };
  }, [collections]);

  const filteredCollections = useMemo(() => {
    return collections.filter(collection => {
      // Price filter
      const matchesPrice = (!filters.minPrice || collection.floorPrice >= parseFloat(filters.minPrice)) &&
                          (!filters.maxPrice || collection.floorPrice <= parseFloat(filters.maxPrice));
      
      // Volume filter
      const matchesVolume = !filters.minVolume || collection.volume24h >= parseFloat(filters.minVolume);
      
      // Size filter
      let matchesSize = true;
      if (filters.sizeFilter === 'small') matchesSize = collection.totalSupply < 1000;
      else if (filters.sizeFilter === 'medium') matchesSize = collection.totalSupply >= 1000 && collection.totalSupply <= 10000;
      else if (filters.sizeFilter === 'large') matchesSize = collection.totalSupply > 10000;
      
      // Verified filter
      const matchesVerified = !filters.verifiedOnly || collection.verified;
      
      return matchesPrice && matchesVolume && matchesSize && matchesVerified;
    });
  }, [collections, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>NFT Analytics Dashboard</h1>
        <p>Real Magic Eden marketplace data • ETH: ${monPrice.toFixed(2)}</p>
        
        <NetworkSelector 
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
          networkStats={networkStats}
        />
        
        {lastUpdated && (
          <div className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
            <button onClick={refreshData} className="refresh-btn">🔄</button>
          </div>
        )}
      </header>

      <DashboardStats stats={dashboardStats} />

      <div className="tab-navigation">
        <button 
          className={activeTab === 'collections' ? 'tab active' : 'tab'}
          onClick={() => handleTabChange('collections')}
        >
          📊 All Collections
        </button>
        <button 
          className={activeTab === 'trending' ? 'tab active' : 'tab'}
          onClick={() => handleTabChange('trending')}
        >
          🔥 Trending Collections
        </button>
        <button 
          className={activeTab === 'portfolio' ? 'tab active' : 'tab'}
          onClick={() => handleTabChange('portfolio')}
        >
          💼 Portfolio Tracker
        </button>
      </div>

      {activeTab === 'collections' && (
        <>
          <SearchBar
            onSearch={handleSearch}
            onClear={clearSearch}
            searchQuery={searchQuery}
            loading={searchLoading}
            isSearchMode={isSearchMode}
            placeholder="Search collections..."
          />

          <AdvancedFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={setSortBy}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
          />
        </>
      )}

      {activeTab === 'collections' && (
        <div className="collections-section">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              {error}
              <button onClick={refreshData} className="retry-btn">Retry</button>
            </div>
          ) : filteredCollections.length > 0 ? (
            <>
              <div className={`collections-${viewMode}`}>
                {filteredCollections.map(collection => (
                  <CollectionCard 
                    key={collection.id} 
                    collection={collection}
                    viewMode={viewMode}
                  />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                loading={loading || searchLoading}
              />
            </>
          ) : (
            <div className="no-results">
              {isSearchMode 
                ? `No collections found for "${searchQuery}"`
                : error || 'No collections found.'}
            </div>
          )}
        </div>
      )}

      {activeTab === 'trending' && (
        <TrendingSection 
          collections={trendingCollections} 
          loading={loading}
          onPageChange={(page) => fetchTrendingCollections(page)}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}

      {activeTab === 'portfolio' && (
        <PortfolioSection 
          portfolio={userPortfolio}
          walletStats={walletStats}
          onAddressChange={setUserAddress}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;