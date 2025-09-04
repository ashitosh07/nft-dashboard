import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onClear, searchQuery, loading, isSearchMode, placeholder = "Search collections..." }) => {
  const [inputValue, setInputValue] = useState(searchQuery || '');

  useEffect(() => {
    setInputValue(searchQuery || '');
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Auto-search after user stops typing for 500ms
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (e.target.value.trim()) {
        onSearch(e.target.value.trim());
      } else if (isSearchMode) {
        onClear();
      }
    }, 500);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className="search-input"
            disabled={loading}
          />
          {loading && (
            <div className="search-spinner">
              <div className="spinner-small"></div>
            </div>
          )}
          {isSearchMode && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-search-btn"
              disabled={loading}
            >
              ✕
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="search-btn"
          disabled={loading || !inputValue.trim()}
        >
          🔍 Search
        </button>
      </form>
      {isSearchMode && (
        <div className="search-status">
          Showing search results for: <strong>"{searchQuery}"</strong>
          <button onClick={handleClear} className="view-all-btn">
            View All Collections
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;