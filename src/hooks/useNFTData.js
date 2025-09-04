import { useState, useEffect, useCallback } from 'react';
import { monadAPI, monadNetworkAPI } from '../services/apiService';

export const useNFTData = () => {
  const [collections, setCollections] = useState([]);
  const [trendingCollections, setTrendingCollections] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [walletStats, setWalletStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monPrice, setMonPrice] = useState(0);
  const [networkStats, setNetworkStats] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  const [userAddress, setUserAddress] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [continuation, setContinuation] = useState(null);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const ITEMS_PER_PAGE = 20;

  const fetchCollections = useCallback(async (page = 1, continuationToken = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use continuation token for proper pagination instead of offset
      const collectionsData = await monadAPI.getCollections(ITEMS_PER_PAGE, continuationToken);
      
      console.log(`Fetching page ${page}, got ${collectionsData.collections?.length || 0} collections`);
      
      if (collectionsData && collectionsData.collections && collectionsData.collections.length > 0) {
        setCollections(collectionsData.collections);
        setHasNextPage(!!collectionsData.continuation);
        setHasPrevPage(page > 1);
        setContinuation(collectionsData.continuation);
        setCurrentPage(page);
        setTotalPages(page + (collectionsData.continuation ? 50 : 0)); // Estimate more pages
      } else {
        setCollections([]);
        setError('No collections found');
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to fetch NFT data');
      setCollections([]);
    } finally {
      setLoading(false);
    }
  }, [ITEMS_PER_PAGE]);

  const fetchTrendingCollections = useCallback(async (page = 1) => {
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const trendingData = await monadAPI.getTrendingCollections('1d', ITEMS_PER_PAGE, offset);
      
      if (trendingData && trendingData.collections) {
        setTrendingCollections(trendingData.collections);
      }
    } catch (err) {
      console.error('Error fetching trending Monad collections:', err);
    }
  }, [ITEMS_PER_PAGE]);

  const searchCollections = useCallback(async (query, page = 1) => {
    if (!query.trim()) {
      setIsSearchMode(false);
      fetchCollections(1);
      return;
    }

    setSearchLoading(true);
    setIsSearchMode(true);
    setError(null);
    
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const searchData = await monadAPI.searchCollections(query, ITEMS_PER_PAGE, offset);
      
      if (searchData && searchData.collections && searchData.collections.length > 0) {
        setCollections(searchData.collections);
        setHasNextPage(!!searchData.continuation);
        setHasPrevPage(page > 1);
        setContinuation(searchData.continuation);
        setCurrentPage(page);
        setTotalPages(page + (searchData.continuation ? 10 : 0));
      } else {
        setCollections([]);
        setError(`No collections found for "${query}"`);
      }
    } catch (err) {
      console.error('Error searching Monad collections:', err);
      setError('Search failed');
      setCollections([]);
    } finally {
      setSearchLoading(false);
    }
  }, [ITEMS_PER_PAGE, fetchCollections]);

  const fetchMonadData = useCallback(async () => {
    try {
      const [price, stats] = await Promise.all([
        monadAPI.getMonPrice(),
        monadNetworkAPI.getNetworkStats(selectedNetwork)
      ]);
      setMonPrice(price);
      setNetworkStats(stats);
    } catch (err) {
      console.error('Error fetching Monad data:', err);
    }
  }, [selectedNetwork]);

  const fetchUserPortfolio = useCallback(async (address) => {
    if (!address) {
      console.log('No address provided');
      return;
    }
    
    console.log('Fetching portfolio and wallet stats for address:', address);
    setLoading(true);
    
    try {
      // Fetch both portfolio and wallet stats
      const [portfolio, stats] = await Promise.all([
        monadAPI.getUserCollections(address, 0, 20),
        monadAPI.getWalletStats(address)
      ]);
      
      console.log('Portfolio fetched:', portfolio);
      console.log('Wallet stats fetched:', stats);
      
      setUserPortfolio(portfolio);
      setWalletStats(stats);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setUserPortfolio([]);
      setWalletStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections(1);
    fetchTrendingCollections(1);
    fetchMonadData();
  }, [fetchCollections, fetchTrendingCollections, fetchMonadData]);

  // Remove network dependency since we're using real Magic Eden data
  // useEffect(() => {
  //   if (isSearchMode && searchQuery) {
  //     searchCollections(searchQuery, 1);
  //   } else {
  //     fetchCollections(1);
  //   }
  //   fetchTrendingCollections(1);
  //   if (userAddress) {
  //     fetchUserPortfolio(userAddress);
  //   }
  // }, [selectedNetwork]);

  useEffect(() => {
    if (userAddress) {
      fetchUserPortfolio(userAddress);
    }
  }, [userAddress, fetchUserPortfolio]);

  const refreshData = useCallback(() => {
    if (isSearchMode && searchQuery) {
      searchCollections(searchQuery, 1);
    } else {
      fetchCollections(1);
    }
    fetchTrendingCollections(1);
    fetchMonadData();
    if (userAddress) {
      fetchUserPortfolio(userAddress);
    }
  }, [fetchCollections, fetchTrendingCollections, fetchMonadData, fetchUserPortfolio, userAddress, isSearchMode, searchQuery, searchCollections]);

  const handlePageChange = useCallback((page) => {
    console.log(`Changing to page ${page}`);
    if (isSearchMode && searchQuery) {
      searchCollections(searchQuery, page);
    } else {
      // For next page, use continuation token; for previous, recalculate
      if (page > currentPage && continuation) {
        fetchCollections(page, continuation);
      } else {
        fetchCollections(page);
      }
    }
  }, [isSearchMode, searchQuery, searchCollections, fetchCollections, currentPage, continuation]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    searchCollections(query, 1);
  }, [searchCollections]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearchMode(false);
    fetchCollections(1);
  }, [fetchCollections]);

  return {
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
  };
};